import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import DashboardPage from "./pages/DashboardPage";
import FarmsPage from "./pages/FarmsPage";
import PredictionsPage from "./pages/PredictionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMLLive = import.meta.env.VITE_ML_SERVICE === "true";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <Routes>
            {/* 🔓 Public route */}
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" replace /> : <LoginPage />
              }
            />

            {/* 🔒 Protected app layout */}
            <Route
              path="/*"
              element={
                user ? (
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                      <AppSidebar />

                      <div className="flex-1 flex flex-col">
                        {/* Top bar */}
                        <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
                          <div className="flex items-center gap-3">
                            <SidebarTrigger />
                            <span className="text-sm text-muted-foreground">
                              Welcome back,{" "}
                              <strong>{user.email}</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                isMLLive
                                  ? "bg-success/10 text-success"
                                  : "bg-destructive/10 text-destructive"
                              }`}
                            >
                              {isMLLive ? "LIVE — ML service connected" : "OFFLINE — ML service not connected"}
                            </span>

                            <div
                              onClick={() => navigate("/settings")}
                              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold cursor-pointer hover:opacity-80 transition"
                            >
                              {user.email?.[0]?.toUpperCase()}
                            </div>
                          </div>
                        </header>

                        {/* Pages */}
                        <main className="flex-1 p-6 overflow-auto">
                          <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/farms" element={<FarmsPage />} />
                            <Route path="/predictions" element={<PredictionsPage />} />
                            <Route path="/analytics" element={<AnalyticsPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;