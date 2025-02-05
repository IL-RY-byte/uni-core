function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(base64: string): Uint8Array {
  return new Uint8Array(
    atob(base64)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
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
