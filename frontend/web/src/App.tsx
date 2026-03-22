import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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

/**
 * App shell with sidebar navigation.
 * Auth is currently mocked — the app always loads as farmer@example.com.
 * Backend team: replace mock user with Firebase onAuthStateChanged + /api/v1/auth/me.
 */

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Top bar */}
              <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  {/* TODO: Replace with real user email from auth context */}
                  <span className="text-sm text-muted-foreground">Welcome back, <strong>farmer@example.com</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                    LIVE — ML service connected (frontend only)
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    FA
                  </div>
                </div>
              </header>

              {/* Page content */}
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/farms" element={<FarmsPage />} />
                  <Route path="/predictions" element={<PredictionsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
