import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);
export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const user = auth.currentUser;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api/v1${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  console.log("Calling:", `${API_URL}/api/v1/auth/me`);

  return res.json();
}