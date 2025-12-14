import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { DonationCard } from "@/components/shared/DonationCard";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrganisationDashboard = () => {
  const [currentOrg, setCurrentOrg] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  /* ================= LOAD ORG + DONATIONS ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentOrg(JSON.parse(storedUser));

    fetchOrganisationDonations();
  }, []);

  const fetchOrganisationDonations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/donations/organisation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDonations(res.data);
    } catch (err) {
      console.error("Failed to fetch organisation donations", err);
    }
  };

  if (!currentOrg) {
    return <div className="p-6 text-center text-lg">Loading organisation...</div>;
  }

  /* ================= DATA DERIVATIONS ================= */
  const incomingDonations = donations.filter(
    (d) => d.status !== "DELIVERED"
  );

  const receivedDonations = donations.filter(
    (d) => d.status === "DELIVERED"
  );

  const capacity = currentOrg.capacity || 0;
  const occupancy = receivedDonations.length;

  const capacityPercentage =
    capacity > 0 ? Math.round((occupancy / capacity) * 100) : 0;

  return (
    <DashboardLayout role="organisation" userName={currentOrg.name}>
      {/* Verification Banner */}
      {currentOrg.verified ? (
        <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success" />
          <div>
            <p className="font-semibold text-foreground">
              Verified Organisation
            </p>
            <p className="text-sm text-muted-foreground">
              Your organisation can receive donations
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="font-semibold">Verification Pending</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Received"
          value={receivedDonations.length}
          icon={Package}
          trend="+5 this week"
          trendUp
        />
        <StatsCard
          title="Incoming"
          value={incomingDonations.length}
          icon={Clock}
          subtitle="On the way"
        />
        <StatsCard
          title="Beneficiaries"
          value={occupancy}
          icon={Users}
          subtitle={`of ${capacity} capacity`}
        />
        <StatsCard
          title="Meals Served"
          value={receivedDonations.length * 5}
          icon={TrendingUp}
          subtitle="Estimated"
        />
      </div>

      {/* Capacity */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">Current Capacity</h3>
            <p className="text-sm text-muted-foreground">
              {occupancy} of {capacity}
            </p>
          </div>
          <span className="text-2xl font-bold">{capacityPercentage}%</span>
        </div>

        <div className="h-4 bg-muted rounded-full">
          <div
            className="h-full bg-success rounded-full"
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
      </div>

      {/* Incoming Donations */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Incoming Donations</h2>
          <Link to="/organisation/incoming">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>

        {incomingDonations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incomingDonations.slice(0, 3).map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                showOrganisation={false}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border rounded-xl">
            No incoming donations
          </div>
        )}
      </div>

      {/* Received Donations */}
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Recently Received</h2>
          <Link to="/organisation/history">
            <Button variant="ghost" size="sm">View History</Button>
          </Link>
        </div>

        {receivedDonations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {receivedDonations.slice(0, 3).map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                showOrganisation={false}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border rounded-xl">
            No received donations yet
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrganisationDashboard;
