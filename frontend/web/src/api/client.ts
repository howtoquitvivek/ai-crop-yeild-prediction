import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL;

export async function callBackend() {
  const user = auth.currentUser;
  if (!user) return;

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/api/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}