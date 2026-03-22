/**
 * Analytics dashboard.
 * Backend integration points:
 *   - Yield trend: GET /api/v1/analytics/yield-trend
 *   - Risk distribution: GET /api/v1/analytics/risk-distribution
 *   - Overview stats: GET /api/v1/analytics/overview
 */

const yieldVsActual = [
  { label: "Kandy Paddy", predicted: 3.8, actual: 3.5 },
  { label: "Matale Veg", predicted: 2.9, actual: null },
  { label: "NE Tea", predicted: 1.2, actual: 1.1 },
  { label: "Galle Rice", predicted: 4.1, actual: 4.3 },
];

const riskDist = [
  { level: "Low", count: 7, color: "bg-success" },
  { level: "Medium", count: 4, color: "bg-warning" },
  { level: "High", count: 1, color: "bg-destructive" },
];

const overviewStats = [
  { label: "Total Farms", value: "4" },
  { label: "Total Predictions", value: "12" },
  { label: "Average Yield", value: "3.2 t/ha" },
];

const maxYield = 5;

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights into your farming performance</p>
      </div>

      {/* Overview Stats — TODO: GET /api/v1/analytics/overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border p-5 text-center">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Yield vs Actual — TODO: GET /api/v1/analytics/yield-trend */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Predicted vs Actual Yield</h2>
        <div className="space-y-3">
          {yieldVsActual.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">
                  Predicted: {item.predicted} t/ha {item.actual !== null ? `| Actual: ${item.actual} t/ha` : "| Actual: —"}
                </span>
              </div>
              <div className="flex gap-1 h-5">
                <div className="bg-primary/70 rounded-sm transition-all" style={{ width: `${(item.predicted / maxYield) * 100}%` }} title="Predicted" />
                {item.actual !== null && (
                  <div className="bg-accent/80 rounded-sm transition-all" style={{ width: `${(item.actual / maxYield) * 100}%` }} title="Actual" />
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-4 text-xs text-muted-foreground pt-2">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary/70 rounded-sm inline-block" /> Predicted</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-accent/80 rounded-sm inline-block" /> Actual</span>
          </div>
        </div>
      </div>

      {/* Risk Distribution — TODO: GET /api/v1/analytics/risk-distribution */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Risk Distribution</h2>
        <div className="flex gap-4">
          {riskDist.map((r) => {
            const total = riskDist.reduce((s, x) => s + x.count, 0);
            return (
              <div key={r.level} className="flex-1 text-center">
                <div className="h-24 flex items-end justify-center mb-2">
                  <div className={`${r.color} rounded-t-md w-12 transition-all`} style={{ height: `${(r.count / total) * 100}%` }} />
                </div>
                <p className="text-sm font-medium">{r.level}</p>
                <p className="text-xs text-muted-foreground">{r.count} predictions</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
