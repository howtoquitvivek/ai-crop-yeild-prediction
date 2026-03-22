import { Sprout, BarChart3, TrendingUp, Cpu, Droplets, MessageSquare } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
/**
 * Dashboard / Overview page for farmers.
 * All data here is placeholder — backend team should replace with real API calls:
 *   - Farm count: GET /api/v1/farms (count)
 *   - Predictions this season: GET /api/v1/predictions (filtered by date range)
 *   - Average yield: GET /api/v1/analytics/overview
 *   - Model version: GET /api/v1/admin/models (or from prediction metadata)
 */

const DashboardPage = () => {
  const { farms, predictions, overview, trend, loading } = useDashboard();
  const farmCount = farms?.data?.content?.length || farms?.data?.length || 0;
  const predictionCount =
    predictions?.data?.content?.length || predictions?.data?.length || 0;

  const avgYield = overview?.data?.averageYield || "—";
  const modelVersion = overview?.data?.modelVersion || "—";

  const kpis = [
    { label: "Active Farms", value: farmCount, icon: Sprout, color: "text-primary" },
    { label: "Predictions", value: predictionCount, icon: BarChart3, color: "text-info" },
    { label: "Avg Yield", value: avgYield, icon: TrendingUp, color: "text-warning" },
    { label: "Model Version", value: modelVersion, icon: Cpu, color: "text-muted-foreground" },
  ];

  const yieldTrend =
    trend?.data?.map((item: any) => ({
      month: item.month,
      value: item.value,
    })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground mt-1">Your farm performance at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-lg border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Yield Trend (CSS bars) */}
      {/* TODO: Replace with real data from GET /api/v1/analytics/yield-trend */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Yield Trend</h2>
        <div className="flex items-end gap-3 h-40">
          {yieldTrend.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary/80 rounded-t-md transition-all"
                style={{ height: `${item.value}%` }}
              />
              <span className="text-xs text-muted-foreground">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Best Actions */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Next Best Actions</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
            <Droplets className="h-5 w-5 text-info mt-0.5" />
            <div>
              <p className="font-medium text-sm">Check irrigation for Farm "Kandy Paddy"</p>
              <p className="text-xs text-muted-foreground">Predicted yield may improve with optimized watering schedule</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
            <MessageSquare className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-sm">Submit actual yield for last season</p>
              <p className="text-xs text-muted-foreground">Your feedback helps improve prediction accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;