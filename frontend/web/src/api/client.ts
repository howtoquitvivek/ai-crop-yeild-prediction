import { auth } from "./firebase";

export async function callBackend() {
  const user = auth.currentUser;
  if (!user) return;

  const token = await user.getIdToken();

  const res = await fetch("http://localhost:8080/api/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}