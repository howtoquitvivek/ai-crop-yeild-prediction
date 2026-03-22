import { apiFetch } from "./client";

export const getPredictions = async () => {
  const res = await apiFetch("/predictions");
  return res;
};