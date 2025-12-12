import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';

import {
  Package,
  Users,
  Truck,
  Building2,
  TrendingUp,
  Utensils,
  ArrowRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Recharts
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
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState<any>(null);

  // TODO: Later fetch these from backend APIs
  const [recentDonations] = useState<any[]>([]);
  const [recentDonors] = useState<any[]>([]);
  const [adminStats] = useState<any>({
    totalDonations: 0,
    monthlyGrowth: "+0%",
    totalDonors: 0,
    totalRiders: 0,
    totalOrganisations: 0,
    foodSaved: "0 kg",
    mealsServed: "0",
  });

  const [monthlyDonations] = useState<any[]>([]);
  const [categoryDistribution] = useState<any[]>([]);

  const COLORS = [
    'hsl(145, 45%, 35%)',
    'hsl(35, 85%, 55%)',
    'hsl(200, 80%, 50%)',
    'hsl(0, 84%, 60%)',
    'hsl(270, 50%, 50%)',
  ];

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.role === "ADMIN") {
        setAdminUser(user);
      }
    }
  }, []);

  if (!adminUser) {
    return (
      <div className="p-6 text-center text-lg">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <DashboardLayout role="admin" userName={adminUser.name}>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Donations"
          value={adminStats.totalDonations}
          icon={Package}
          trend={adminStats.monthlyGrowth}
          trendUp
        />
        <StatsCard
          title="Active Donors"
          value={adminStats.totalDonors}
          icon={Users}
          subtitle="+0 this month"
        />
        <StatsCard
          title="Active Riders"
          value={adminStats.totalRiders}
          icon={Truck}
          subtitle="+0 this month"
        />
        <StatsCard
          title="Organisations"
          value={adminStats.totalOrganisations}
          icon={Building2}
          subtitle="All verified"
        />
      </div>

      {/* Impact Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium">Food Saved</p>
              <p className="text-4xl font-display font-bold mt-1">{adminStats.foodSaved}</p>
              <p className="text-sm text-primary-foreground/70 mt-2">
                Equivalent to reducing CO₂ emissions
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-secondary rounded-2xl p-6 text-secondary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground/70 text-sm font-medium">Meals Served</p>
              <p className="text-4xl font-display font-bold mt-1">{adminStats.mealsServed}</p>
              <p className="text-sm text-secondary-foreground/70 mt-2">
                Helping communities every day
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center">
              <Utensils className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        
        {/* Donations Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-bold text-lg text-foreground mb-4">
            Monthly Donations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyDonations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area 
                type="monotone"
                dataKey="donations"
                stroke="hsl(145, 45%, 35%)"
                fill="hsl(145, 45%, 35%)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-bold text-lg text-foreground mb-4">Food Categories</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Recent Donations */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-foreground">Recent Donations</h3>
            <Link to="/admin/donations">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentDonations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No donations yet
              </div>
            ) : (
              recentDonations.map((donation) => (
                <div key={donation.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{donation.donor?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.foodItems?.length} items → {donation.organisation?.name}
                    </p>
                  </div>
                  <StatusBadge status={donation.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Donors */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-foreground">Recent Donors</h3>
            <Link to="/admin/donors">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentDonors.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No donors yet</div>
            ) : (
              recentDonors.map((donor) => (
                <div key={donor.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground">
                    {donor.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{donor.name}</p>
                    <p className="text-sm text-muted-foreground">{donor.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;
