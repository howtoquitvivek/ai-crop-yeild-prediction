import { useState } from "react";

/**
 * Prediction history + feedback submission.
 * Backend integration points:
 *   - History: GET /api/v1/predictions (supports farmId, page, size, sort)
 *   - Generate: POST /api/v1/predictions/generate { farmId }
 *   - Feedback: POST /api/v1/predictions/{predictionId}/feedback { actualYield, notes }
 */

const mockPredictions = [
  { id: "p1", farm: "Kandy Paddy", crop: "Rice", predictedYield: "3.8 t/ha", confidence: 0.87, model: "v1.3-current", feedback: "Pending" },
  { id: "p2", farm: "Matale Veg Plot", crop: "Tomato", predictedYield: "2.9 t/ha", confidence: 0.62, model: "v1.3-current", feedback: "Submitted" },
  { id: "p3", farm: "Nuwara Eliya Tea", crop: "Tea", predictedYield: "1.2 t/ha", confidence: 0.91, model: "v1.2", feedback: "Pending" },
];

const PredictionsPage = () => {
  const [feedbackForm, setFeedbackForm] = useState({ predictionId: "", actualYield: "", notes: "" });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST /api/v1/predictions/{predictionId}/feedback
    console.log("Feedback submitted (mock):", feedbackForm);
    setFeedbackForm({ predictionId: "", actualYield: "", notes: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Predictions</h1>
        <p className="text-muted-foreground mt-1">View prediction history and submit yield feedback</p>
      </div>

      {/* Prediction History — TODO: GET /api/v1/predictions with paging/filtering */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">Recent Predictions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Farm</th>
                <th className="text-left p-3 font-medium">Crop</th>
                <th className="text-left p-3 font-medium">Predicted Yield</th>
                <th className="text-left p-3 font-medium">Confidence</th>
                <th className="text-left p-3 font-medium">Model</th>
                <th className="text-left p-3 font-medium">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {mockPredictions.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium">{p.farm}</td>
                  <td className="p-3">{p.crop}</td>
                  <td className="p-3">{p.predictedYield}</td>
                  <td className="p-3">
                    <span className={`font-medium ${p.confidence >= 0.8 ? "text-success" : p.confidence >= 0.6 ? "text-warning" : "text-destructive"}`}>
                      {(p.confidence * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">{p.model}</span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${p.feedback === "Submitted" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                      {p.feedback}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Submit Yield Feedback</h2>
        <p className="text-sm text-muted-foreground mb-4">After harvest, submit your actual yield to help improve prediction accuracy.</p>
        <form onSubmit={handleFeedbackSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {/* TODO: Populate with predictions from GET /api/v1/predictions that have feedback="Pending" */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Prediction</label>
            <select
              value={feedbackForm.predictionId}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, predictionId: e.target.value })}
              required
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="">Choose a prediction...</option>
              {mockPredictions.filter(p => p.feedback === "Pending").map((p) => (
                <option key={p.id} value={p.id}>{p.farm} — {p.crop} ({p.predictedYield})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Actual Yield (t/ha)</label>
            <input
              type="number"
              step="0.1"
              value={feedbackForm.actualYield}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, actualYield: e.target.value })}
              required
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              placeholder="e.g. 3.5"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Notes (optional)</label>
            <textarea
              value={feedbackForm.notes}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, notes: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              rows={3}
              placeholder="Any observations about the season..."
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionsPage;
