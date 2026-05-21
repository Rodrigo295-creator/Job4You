/** Normaliza relação `profiles` do PostgREST (objeto ou array de 1 item). */
export function normalizeProfile<T extends { full_name?: string | null; avatar_url?: string | null }>(
  profiles: T | T[] | null | undefined,
): T | null {
  if (!profiles) return null;
  if (Array.isArray(profiles)) return profiles[0] ?? null;
  return profiles;
}
