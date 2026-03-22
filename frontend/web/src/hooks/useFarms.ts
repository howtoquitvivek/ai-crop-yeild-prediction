import { useQuery } from "@tanstack/react-query";
import { getFarms } from "@/api/farms";

export const useFarms = () => {
  return useQuery({
    queryKey: ["farms"],
    queryFn: getFarms,
  });
};