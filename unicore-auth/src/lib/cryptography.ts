function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export async function hashPassword(
  password: string,
  salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16))
): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const key = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt.buffer as ArrayBuffer,
      iterations: 100_000,
      hash: "SHA-256",
    },
    key,
    256
  );

  const hashedPassword = new Uint8Array(derivedBits);

  return { hash: toBase64(hashedPassword), salt: toBase64(salt) };
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string
): Promise<boolean> {
  const saltBuffer = fromBase64(storedSalt);

  const { hash } = await hashPassword(password, saltBuffer);
  const hashBuffer = fromBase64(hash);
  const storedHashBuffer = fromBase64(storedHash);

  if (hashBuffer.length !== storedHashBuffer.length) {
    return false;
  }

  return crypto.subtle.timingSafeEqual(storedHashBuffer, hashBuffer);
}

/**
 * Generates random UUID.
 * @returns The string containing UUID.
 */
export function generateSessionId(): string {
  return crypto.randomUUID(); // Uses Cloudflare Workers' native UUID generator
}

/**
 * Signs a string using HMAC (SHA-256 or SHA-512).
 * @param data - The string to be signed.
 * @param key - The secret key for HMAC.
 * @param alg - The hashing algorithm ("SHA-256" or "SHA-512").
 * @returns The Base64-encoded signature.
 */
export async function signString(
  data: string,
  key: string,
  alg: "SHA-256" | "SHA-512"
): Promise<string> {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key);
  const dataBuffer = encoder.encode(data);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: { name: alg } },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, dataBuffer);
  return btoa(String.fromCharCode(...new Uint8Array(signature))); // Convert to Base64
}

/**
 * Verifies if a given signature is valid for the provided data.
 * Uses crypto.subtle.timingSafeEqual to prevent timing attacks.
 * @param data - The original string.
 * @param signature - The Base64-encoded signature.
 * @param key - The secret key used for signing.
 * @param alg - The hashing algorithm ("SHA-256" or "SHA-512").
 * @returns True if valid, false otherwise.
 */
export async function verifySignedString(
  data: string,
  signature: string,
  key: string,
  alg: "SHA-256" | "SHA-512"
): Promise<boolean> {
  const expectedSignature = await signString(data, key, alg);

  // Convert Base64 back to Uint8Array
  const expectedSignatureBytes = fromBase64(expectedSignature);
  const signatureBytes = fromBase64(signature);
  
  if (expectedSignatureBytes.length !== signatureBytes.length) return false;

  return crypto.subtle.timingSafeEqual(expectedSignatureBytes, signatureBytes);
}
