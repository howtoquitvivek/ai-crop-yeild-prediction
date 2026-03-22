import { apiFetch } from "./client";

export const getOverview = async () => {
  const res = await apiFetch("/analytics/overview");
  return res;
};

export const getYieldTrend = async () => {
  const res = await apiFetch("/analytics/yield-trend");
  return res;
};