import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Users,
  Truck,
  Building2,
  ArrowRight,
  Utensils,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentDonors, setRecentDonors] = useState([]);
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const currentYear = new Date().getFullYear();
const [year, setYear] = useState(currentYear);
const [month, setMonth] = useState("");
 
  const COLORS = ["#16a34a", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setAdminUser(JSON.parse(user));

    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

       const res = await axios.get(
  `http://localhost:5000/api/admin/stats?year=${year}&month=${month}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);


        setStats(res.data.stats);
        setRecentDonations(res.data.recentDonations || []);
        setRecentDonors(res.data.recentDonors || []);
        setMonthlyDonations(res.data.monthlyDonations || []);
        setCategoryDistribution(res.data.categoryDistribution || []);
      } catch (err) {
        console.error("ADMIN FETCH ERROR:", err);
      }
    };

    fetchAdminData();
  }, []);

  if (!adminUser || !stats) {
    return <div className="p-6 text-center">Loading admin dashboard...</div>;
  }

  return (
    <DashboardLayout role="admin" userName={adminUser.name}>
      
      {/* ================= TOP STATS (KEEP CLEAN) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total Donations" value={stats.totalDonations} icon={Package} />
        <StatsCard title="Donors" value={stats.totalDonors} icon={Users} />
        <StatsCard title="Riders" value={stats.totalRiders} icon={Truck} />
        <StatsCard title="Organisations" value={stats.totalOrganisations} icon={Building2} />
      </div>

      {/* ================= IMPACT STATS (SEPARATE DIV) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard title="Food Saved" value={stats.foodSaved} icon={Utensils} />
        <StatsCard title="Meals Served" value={stats.mealsServed} icon={Utensils} />
        <StatsCard title="Monthly Growth" value={stats.monthlyGrowth} icon={TrendingUp} />
      </div>
       

      {/* ================= CHARTS ================= */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-card p-6 rounded-xl">
          <h3 className="font-bold mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyDonations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="donations"
                stroke="#16a34a"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-bold mb-4">Food Categories</h3>
          {categoryDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={90}
                >
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground">No category data</p>
          )}
        </div>
      </div>

      {/* ================= RECENT DONATIONS ================= */}
      <div className="bg-card rounded-xl">
        <div className="p-4 border-b flex justify-between">
          <h3 className="font-bold">Recent Donations</h3>
          <Link to="/admin/donations">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {recentDonations.length === 0 ? (
           <div className="p-6 text-muted-foreground">
              No donations found
            </div>
        ) : (
          recentDonations.map(d => (
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
          ))
        )}
      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;
