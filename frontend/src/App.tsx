import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Donor
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorDonations from "./pages/donor/DonorDonations";

// Rider
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderAssignments from "./pages/rider/RiderAssignments";

// Organisation
import OrganisationDashboard from "./pages/organisation/OrganisationDashboard";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

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
          
          {/* Donor Routes */}
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/donations" element={<DonorDonations />} />
          <Route path="/donor/history" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<DonorDashboard />} />
          
          {/* Rider Routes */}
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/rider/assignments" element={<RiderAssignments />} />
          <Route path="/rider/completed" element={<RiderDashboard />} />
          <Route path="/rider/profile" element={<RiderDashboard />} />
          
          {/* Organisation Routes */}
          <Route path="/organisation/dashboard" element={<OrganisationDashboard />} />
          <Route path="/organisation/incoming" element={<OrganisationDashboard />} />
          <Route path="/organisation/history" element={<OrganisationDashboard />} />
          <Route path="/organisation/profile" element={<OrganisationDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/donations" element={<AdminDashboard />} />
          <Route path="/admin/donors" element={<AdminDashboard />} />
          <Route path="/admin/riders" element={<AdminDashboard />} />
          <Route path="/admin/organisations" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
