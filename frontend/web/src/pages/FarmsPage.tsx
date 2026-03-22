import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * Farm management page.
 * Backend integration points:
 *   - List farms: GET /api/v1/farms
 *   - Create farm: POST /api/v1/farms
 *   - Update farm: PUT /api/v1/farms/{farmId}
 *   - Delete farm: DELETE /api/v1/farms/{farmId} (soft delete, sets active=false)
 *   - Dropdown data: GET /api/v1/meta/crops, /districts, /soil-types, /irrigation-types
 */

interface FarmForm {
  name: string;
  district: string;
  crop: string;
  soilType: string;
  irrigationType: string;
  landSize: string;
}

const emptyForm: FarmForm = { name: "", district: "", crop: "", soilType: "", irrigationType: "", landSize: "" };

const mockFarms = [
  { id: "1", name: "Kandy Paddy", district: "Kandy", crop: "Rice", soilType: "Clay", irrigationType: "Canal", landSize: "2.5 ha", active: true },
  { id: "2", name: "Matale Veg Plot", district: "Matale", crop: "Tomato", soilType: "Loam", irrigationType: "Drip", landSize: "1.0 ha", active: true },
  { id: "3", name: "Nuwara Eliya Tea", district: "Nuwara Eliya", crop: "Tea", soilType: "Laterite", irrigationType: "Rain-fed", landSize: "5.0 ha", active: true },
];

const FarmsPage = () => {
  const [form, setForm] = useState<FarmForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST /api/v1/farms with form data + auth token
    // After success, refresh farm list from GET /api/v1/farms
    console.log("Farm form submitted (mock):", form);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Farms</h1>
          <p className="text-muted-foreground mt-1">Manage your registered farms</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add Farm
        </button>
      </div>

      {/* Farm List — TODO: Replace with data from GET /api/v1/farms */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Farm Name</th>
                <th className="text-left p-3 font-medium">District</th>
                <th className="text-left p-3 font-medium">Crop</th>
                <th className="text-left p-3 font-medium">Soil</th>
                <th className="text-left p-3 font-medium">Irrigation</th>
                <th className="text-left p-3 font-medium">Land Size</th>
              </tr>
            </thead>
            <tbody>
              {mockFarms.map((farm) => (
                <tr key={farm.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium">{farm.name}</td>
                  <td className="p-3">{farm.district}</td>
                  <td className="p-3">{farm.crop}</td>
                  <td className="p-3">{farm.soilType}</td>
                  <td className="p-3">{farm.irrigationType}</td>
                  <td className="p-3">{farm.landSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground p-3 border-t">
          This list will be powered by <code>GET /api/v1/farms</code>. Edit/delete actions via <code>PUT/DELETE /api/v1/farms/&#123;farmId&#125;</code>.
        </p>
      </div>

      {/* Add Farm Form */}
      {showForm && (
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Farm</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Farm Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. Kandy Paddy" />
            </div>
            {/* TODO: Replace with data from GET /api/v1/meta/districts */}
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <input name="district" value={form.district} onChange={handleChange} required className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. Kandy" />
            </div>
            {/* TODO: Replace with data from GET /api/v1/meta/crops */}
            <div>
              <label className="block text-sm font-medium mb-1">Crop Type</label>
              <input name="crop" value={form.crop} onChange={handleChange} required className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. Rice" />
            </div>
            {/* TODO: Replace with data from GET /api/v1/meta/soil-types */}
            <div>
              <label className="block text-sm font-medium mb-1">Soil Type</label>
              <input name="soilType" value={form.soilType} onChange={handleChange} required className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. Clay" />
            </div>
            {/* TODO: Replace with data from GET /api/v1/meta/irrigation-types */}
            <div>
              <label className="block text-sm font-medium mb-1">Irrigation Type</label>
              <input name="irrigationType" value={form.irrigationType} onChange={handleChange} required className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. Canal" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Land Size (ha)</label>
              <input name="landSize" value={form.landSize} onChange={handleChange} required type="number" step="0.1" className="w-full border rounded-md px-3 py-2 text-sm bg-background" placeholder="e.g. 2.5" />
            </div>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Save Farm
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border px-6 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmsPage;
