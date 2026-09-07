/**
 * Resolves API-relative media paths (e.g. `/api/upload/temp/...`) to absolute URLs.
 */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  const base = process.env.NEXT_BASE_URL?.replace(/\/+$/, '');
  if (!base) return path;

  return `${base}/${path.replace(/^\/+/, '')}`;
}
