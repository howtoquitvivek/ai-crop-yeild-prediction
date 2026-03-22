import { apiFetch } from "./client";

export const getFarms = async () => {
  return apiFetch("/farms");
};

export const createFarm = async (data: {
  name: string;
  district: string;
  crop: string;
  landSize?: number;
  irrigationType?: string;
  soilType?: string;
}) => {
  return apiFetch("/farms", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteFarm = async (id: string) => {
  return apiFetch(`/farms/${id}`, {
    method: "DELETE",
  });
};