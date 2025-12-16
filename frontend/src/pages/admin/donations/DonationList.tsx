import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { Package, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
const DonationList = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/donations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setDonations(res.data))
      .catch(err => console.error(err));
  }, []);

  const deliveredCount = donations.filter(
    d => d.status === "DELIVERED"
  ).length;

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatsCard
            title="Total Donations"
            value={donations.length}
            icon={Package}
          />
          <StatsCard
            title="Delivered Donations"
            value={deliveredCount}
            icon={CheckCircle}
          />
        </div>

        {/* LIST */}
        <div className="bg-card rounded-xl">
          <div className="p-4 border-b font-bold">All Donations</div>

          {donations.length === 0 && (
            <div className="p-6 text-muted-foreground">
              No donations found
            </div>
          )}

          {donations.map(d => (
            <Link
              key={d.id}
              to={`/admin/donations/${d.id}`}
              className="p-4 block hover:bg-muted transition"
            >
              <p className="font-medium">
                {d.donor?.name || "Unknown Donor"}
              </p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{(d.foodItems?.length || 0)} items</span>
                <StatusBadge status={d.status} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DonationList;
