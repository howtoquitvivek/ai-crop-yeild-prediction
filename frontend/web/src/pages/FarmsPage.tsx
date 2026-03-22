import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFarms, createFarm } from "@/api/farms";

interface FarmForm {
  name: string;
  district: string;
  crop: string;
  soilType: string;
  irrigationType: string;
  landSize: string;
}

const emptyForm: FarmForm = {
  name: "",
  district: "",
  crop: "",
  soilType: "",
  irrigationType: "",
  landSize: "",
};

const FarmsPage = () => {
  const [form, setForm] = useState<FarmForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  // 🔹 Fetch farms
  const { data, isLoading } = useQuery({
    queryKey: ["farms"],
    queryFn: getFarms,
  });

  const farms = data?.data?.content || data?.data || [];

  // 🔹 Create farm mutation
  const createMutation = useMutation({
    mutationFn: createFarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      setForm(emptyForm);
      setShowForm(false);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate({
      ...form,
      landSize: Number(form.landSize),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Farms</h1>
          <p className="text-muted-foreground mt-1">
            Manage your registered farms
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add Farm
        </button>
      </div>

      {/* Loading */}
      {isLoading && <p>Loading farms...</p>}

      {/* Farms Table */}
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
              {farms.map((farm: any) => (
                <tr
                  key={farm.id}
                  className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                >
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
          Powered by <code>GET /api/v1/farms</code>
        </p>
      </div>

      {/* Add Farm Form */}
      {showForm && (
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Farm</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Farm Name"
              className="border p-2"
              required
            />

            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              className="border p-2"
              required
            />

            <input
              name="crop"
              value={form.crop}
              onChange={handleChange}
              placeholder="Crop"
              className="border p-2"
              required
            />

            <input
              name="soilType"
              value={form.soilType}
              onChange={handleChange}
              placeholder="Soil Type"
              className="border p-2"
              required
            />

            <input
              name="irrigationType"
              value={form.irrigationType}
              onChange={handleChange}
              placeholder="Irrigation"
              className="border p-2"
              required
            />

            <input
              name="landSize"
              value={form.landSize}
              onChange={handleChange}
              placeholder="Land Size"
              type="number"
              className="border p-2"
              required
            />

            <button
              type="submit"
              className="bg-primary text-white p-2 col-span-2"
            >
              Save Farm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmsPage;