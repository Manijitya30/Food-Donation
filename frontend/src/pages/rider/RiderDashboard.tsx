import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { DonationCard } from "@/components/shared/DonationCard";
import { Button } from "@/components/ui/button";
import { Truck, Clock, CheckCircle, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const RiderDashboard = () => {
  const [currentRider, setCurrentRider] = useState<any>(null);
  const [deliveries, setDeliveries] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  /* ================= LOAD RIDER + DELIVERIES ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setCurrentRider(JSON.parse(stored));

    fetchRiderDeliveries();
  }, []);

  const fetchRiderDeliveries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/donations/rider",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeliveries(res.data);
    } catch (err) {
      console.error("Failed to fetch rider deliveries", err);
    }
  };

  if (!currentRider) {
    return <div className="p-6 text-center text-lg">Loading rider...</div>;
  }

  /* ================= DERIVED DATA ================= */
  const activeDeliveries = deliveries.filter(
    (d) => d.status !== "DELIVERED"
  );

  const completedDeliveries = deliveries.filter(
    (d) => d.status === "DELIVERED"
  );

  return (
    <DashboardLayout role="rider" userName={currentRider.name}>
      {/* Status Banner */}
      <div
        className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
          currentRider.status === "available"
            ? "bg-success/10 border border-success/20"
            : currentRider.status === "busy"
            ? "bg-warning/10 border border-warning/20"
            : "bg-muted border border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              currentRider.status === "available"
                ? "bg-success"
                : currentRider.status === "busy"
                ? "bg-warning"
                : "bg-muted-foreground"
            }`}
          />
          <div>
            <p className="font-semibold text-foreground capitalize">
              {currentRider.status || "available"}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentRider.currentLocation || "Not Updated"}
            </p>
          </div>
        </div>

        <Button
          variant={
            currentRider.status === "available" ? "outline" : "default"
          }
          size="sm"
        >
          {currentRider.status === "available" ? "Go Offline" : "Go Online"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Deliveries"
          value={deliveries.length}
          icon={Truck}
          trend="+8 this week"
          trendUp
        />
        <StatsCard
          title="Active Assignments"
          value={activeDeliveries.length}
          icon={Clock}
          subtitle="Currently assigned"
        />
        <StatsCard
          title="Completed"
          value={completedDeliveries.length}
          icon={CheckCircle}
          subtitle="Successfully delivered"
        />
        <StatsCard
          title="Rating"
          value={currentRider.rating || "4.8"}
          icon={Star}
          subtitle="Based on reviews"
        />
      </div>

      {/* Active Assignments */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">
            Active Assignments
          </h2>
          <Link to="/rider/assignments">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {activeDeliveries.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDeliveries.slice(0, 3).map((delivery) => (
              <DonationCard
                key={delivery.id}
                donation={delivery}
                showRider={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No active assignments
            </h3>
            <p className="text-sm text-muted-foreground">
              New assignments will appear here when available.
            </p>
          </div>
        )}
      </div>

      {/* Recent Completions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">
            Recent Completions
          </h2>
          <Link to="/rider/completed">
            <Button variant="ghost" size="sm">
              View History
            </Button>
          </Link>
        </div>

        {completedDeliveries.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedDeliveries.slice(0, 3).map((delivery) => (
              <DonationCard
                key={delivery.id}
                donation={delivery}
                showRider={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground">
              No completed deliveries yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Your delivery history will appear here.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RiderDashboard;
