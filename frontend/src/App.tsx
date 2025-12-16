import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/* Auth */
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

/* Donor */
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorDonations from "./pages/donor/DonorDonations";

/* Rider */
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderAssignments from "./pages/rider/RiderAssignments";

/* Organisation */
import OrganisationDashboard from "./pages/organisation/OrganisationDashboard";

/* Admin */
import AdminDashboard from "./pages/admin/AdminDashboard";
import DonationList from "./pages/admin/donations/DonationList";
import DonationDetails from "./pages/admin/donations/DonationDetails";

import DonorList from "./pages/admin/donors/DonorList";
import DonorDetails from "./pages/admin/donors/DonorDetails";

import RiderList from "./pages/admin/riders/RiderList";
import RiderDetails from "./pages/admin/riders/RiderDetails";

import OrganisationList from "./pages/admin/organisations/OrganisationList";
import OrganisationDetails from "./pages/admin/organisations/OrganisationDetails";


/* Auth Guard */
import RequireRole from "./components/auth/RequireRole";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Index />} />

          {/* ================= AUTH ================= */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

          {/* ================= DONOR ================= */}
          <Route
            path="/donor/dashboard"
            element={<RequireRole role="DONOR"><DonorDashboard /></RequireRole>}
          />
          <Route
            path="/donor/donations"
            element={<RequireRole role="DONOR"><DonorDonations /></RequireRole>}
          />

          {/* ================= RIDER ================= */}
          <Route
            path="/rider/dashboard"
            element={<RequireRole role="RIDER"><RiderDashboard /></RequireRole>}
          />
          <Route
            path="/rider/assignments"
            element={<RequireRole role="RIDER"><RiderAssignments /></RequireRole>}
          />

          {/* ================= ORGANISATION ================= */}
          <Route
            path="/organisation/dashboard"
            element={<RequireRole role="ORGANISATION"><OrganisationDashboard /></RequireRole>}
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={<RequireRole role="ADMIN"><AdminDashboard /></RequireRole>}
          />

          <Route
          path="/admin/donations"
          element={<RequireRole role="ADMIN"><DonationList /></RequireRole>}
        />
        <Route
          path="/admin/donations/:id"
          element={<RequireRole role="ADMIN"><DonationDetails /></RequireRole>}
        />

        <Route
          path="/admin/donors"
          element={<RequireRole role="ADMIN"><DonorList /></RequireRole>}
        />
        <Route
          path="/admin/donors/:id"
          element={<RequireRole role="ADMIN"><DonorDetails /></RequireRole>}
        />

        <Route
          path="/admin/riders"
          element={<RequireRole role="ADMIN"><RiderList /></RequireRole>}
        />
        <Route
          path="/admin/riders/:id"
          element={<RequireRole role="ADMIN"><RiderDetails /></RequireRole>}
        />

        <Route
          path="/admin/organisations"
          element={<RequireRole role="ADMIN"><OrganisationList /></RequireRole>}
        />
        <Route
          path="/admin/organisations/:id"
          element={<RequireRole role="ADMIN"><OrganisationDetails /></RequireRole>}
        />


          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
