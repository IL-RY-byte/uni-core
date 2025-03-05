import { UserSession } from "./types";

export async function storeSession(
  kv: KVNamespace,
  sessionId: string,
  sessionData: object,
  ttlSeconds: number = 60 * 60 * 24 * 7
) {
  const sessionKey = `session:${sessionId}`;
  await kv.put(sessionKey, JSON.stringify(sessionData), {
    expirationTtl: ttlSeconds,
  });
}

/**
 * Retrieves session data from Cloudflare KV.
 * @param kv - The Cloudflare KV namespace.
 * @param sessionId - The session ID.
 * @returns The parsed session data or null if not found.
 */
export async function getSession(
  kv: KVNamespace,
  sessionId: string
): Promise<UserSession | null> {
  const sessionKey = `session:${sessionId}`;
  const sessionData = await kv.get(sessionKey);
  return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Deletes a session from Cloudflare KV.
 * @param kv - The Cloudflare KV namespace.
 * @param sessionId - The session ID.
 */
export async function deleteSession(
  kv: KVNamespace,
  sessionId: string
): Promise<void> {
  const sessionKey = `session:${sessionId}`;
  await kv.delete(sessionKey);
}
