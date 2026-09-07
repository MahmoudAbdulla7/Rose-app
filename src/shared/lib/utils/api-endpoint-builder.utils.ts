/**
 * Builds an API endpoint URL with the given path and search params.
 * Joins base and path without relying on trailing/leading slash conventions.
 * @param path - The path of the API endpoint.
 * @param searchParams - The search params of the API endpoint.
 * @returns The API endpoint URL.
 */

export function buildApiEndpoint(
  path: string,
  searchParams?: Record<string, string | string[] | undefined>,
): URL {
  const rawBase = process.env.NEXT_BASE_URL;
  if (!rawBase) {
    throw new Error(
      'NEXT_BASE_URL is not configured. Copy .env.example to .env.local and restart the dev server.',
    );
  }

  const base = rawBase.replace(/\/+$/, '');
  const endpoint = new URL(`${base}/${path.replace(/^\/+/, '')}`);

  if (searchParams) {
    endpoint.search = new URLSearchParams(
      Object.entries(searchParams).map(([key, value]) => [key, value as string]),
    ).toString();
  }

  return endpoint;
}
