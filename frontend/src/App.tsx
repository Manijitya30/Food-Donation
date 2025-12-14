import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorDonations from "./pages/donor/DonorDonations";

import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderAssignments from "./pages/rider/RiderAssignments";

import OrganisationDashboard from "./pages/organisation/OrganisationDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";

import RequireRole from "./components/auth/RequireRole";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />

          {/* Auth */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* ================= DONOR ================= */}
          <Route
            path="/donor/dashboard"
            element={
              <RequireRole role="DONOR">
                <DonorDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/donor/donations"
            element={
              <RequireRole role="DONOR">
                <DonorDonations />
              </RequireRole>
            }
          />
          <Route
            path="/donor/history"
            element={
              <RequireRole role="DONOR">
                <DonorDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/donor/profile"
            element={
              <RequireRole role="DONOR">
                <DonorDashboard />
              </RequireRole>
            }
          />

          {/* ================= RIDER ================= */}
          <Route
            path="/rider/dashboard"
            element={
              <RequireRole role="RIDER">
                <RiderDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/rider/assignments"
            element={
              <RequireRole role="RIDER">
                <RiderAssignments />
              </RequireRole>
            }
          />
          <Route
            path="/rider/completed"
            element={
              <RequireRole role="RIDER">
                <RiderDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/rider/profile"
            element={
              <RequireRole role="RIDER">
                <RiderDashboard />
              </RequireRole>
            }
          />

          {/* ================= ORGANISATION ================= */}
          <Route
            path="/organisation/dashboard"
            element={
              <RequireRole role="ORGANISATION">
                <OrganisationDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/organisation/incoming"
            element={
              <RequireRole role="ORGANISATION">
                <OrganisationDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/organisation/history"
            element={
              <RequireRole role="ORGANISATION">
                <OrganisationDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/organisation/profile"
            element={
              <RequireRole role="ORGANISATION">
                <OrganisationDashboard />
              </RequireRole>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/donations"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/donors"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/riders"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/organisations"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RequireRole role="ADMIN">
                <AdminDashboard />
              </RequireRole>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
