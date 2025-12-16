import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { Truck, User } from "lucide-react";

const RiderList = () => {
  const [riders, setRiders] = useState<any[]>([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/admin/riders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setRiders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatsCard
            title="Total Riders"
            value={riders.length}
            icon={User}
          />
          <StatsCard
            title="Active Riders"
            value={riders.length}
            icon={Truck}
          />
        </div>

        {/* LIST */}
        <div className="bg-card rounded-xl">
          <div className="p-4 border-b font-bold">All Riders</div>

          {riders.length === 0 && (
            <div className="p-6 text-muted-foreground">
              No riders found
            </div>
          )}

          {riders.map(r => (
            <Link
              key={r.id}
              to={`/admin/riders/${r.id}`}
              className="p-4 block hover:bg-muted transition"
            >
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.email}</p>
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default RiderList;
