import { useQuery } from "@tanstack/react-query";
import { getOverview, getYieldTrend } from "@/api/analytics";
import { getFarms } from "@/api/farms";
import { getPredictions } from "@/api/predictions";

export const useDashboard = () => {
  const farmsQuery = useQuery({
    queryKey: ["farms"],
    queryFn: getFarms,
    retry: false,
  });

  const predictionsQuery = useQuery({
    queryKey: ["predictions"],
    queryFn: getPredictions,
    retry: false,
  });

  const overviewQuery = useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
    retry: false,
  });

  const trendQuery = useQuery({
    queryKey: ["yield-trend"],
    queryFn: getYieldTrend,
    retry: false,
  });

  return {
    farms: farmsQuery.data,
    predictions: predictionsQuery.data,
    overview: overviewQuery.data,
    trend: trendQuery.data,
    loading:
      farmsQuery.isLoading ||
      predictionsQuery.isLoading ||
      overviewQuery.isLoading ||
      trendQuery.isLoading,
  };
};