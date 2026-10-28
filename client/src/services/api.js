const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export async function request(path, { token, ...options } = {}) {
  let response;
  try {
    response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { 'x-investigation-token': token } : {}), ...options?.headers } });
  } catch {
    throw new Error('The case server is unavailable. Start the API and try again.');
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || 'Request failed. Please try again.');
  return body;
}

export function getToken(id) { return sessionStorage.getItem(`investigation:${id}`); }
export function saveToken(id, token) { sessionStorage.setItem(`investigation:${id}`, token); }
