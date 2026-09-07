import { API_HEADERS } from '../apis/headers.options';
import { getNextAuthToken } from './auth.utils';

export async function getAuthHeaders() {
  const jwt = await getNextAuthToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error('Authentication required');
  }

  return {
    ...API_HEADERS.JSON,
    ...API_HEADERS.AUTHORIZATION(token),
  };
}
