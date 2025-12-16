import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { Building2, Package } from "lucide-react";

const OrganisationList = () => {
  const [orgs, setOrgs] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/organisations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setOrgs(res.data));
  }, []);

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatsCard
            title="Total Organisations"
            value={orgs.length}
            icon={Building2}
          />
          <StatsCard
            title="Receiving Donations"
            value={orgs.length}
            icon={Package}
          />
        </div>

        {/* LIST */}
        <div className="bg-card rounded-xl">
          <div className="p-4 border-b font-bold">All Organisations</div>

          {orgs.map(o => (
            <Link
              key={o.id}
              to={`/admin/organisations/${o.id}`}
              className="p-4 block hover:bg-muted transition"
            >
              <p className="font-medium">{o.name}</p>
              <p className="text-sm text-muted-foreground">{o.email}</p>
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default OrganisationList;
