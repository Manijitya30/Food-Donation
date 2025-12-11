import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { 
  donations, 
  donors, 
  riders, 
  organisations, 
  adminStats, 
  monthlyDonations,
  categoryDistribution 
} from '@/lib/dummy-data';
import { 
  Package, 
  Users, 
  Truck, 
  Building2, 
  TrendingUp, 
  Utensils,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
} from 'recharts';

const AdminDashboard = () => {
  const recentDonations = donations.slice(0, 5);
  const recentDonors = donors.slice(0, 4);
  const COLORS = ['hsl(145, 45%, 35%)', 'hsl(35, 85%, 55%)', 'hsl(200, 80%, 50%)', 'hsl(0, 84%, 60%)', 'hsl(270, 50%, 50%)'];

  return (
    <DashboardLayout role="admin" userName="Admin">
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
          subtitle="+12 this month"
        />
        <StatsCard
          title="Active Riders"
          value={adminStats.totalRiders}
          icon={Truck}
          subtitle="+3 this month"
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
              <p className="text-sm text-primary-foreground/70 mt-2">Equivalent to reducing 45 tons of CO2</p>
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
              <p className="text-sm text-secondary-foreground/70 mt-2">Feeding hope to communities</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center">
              <Utensils className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Donations Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-bold text-lg text-foreground mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyDonations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="donations" 
                stroke="hsl(145, 45%, 35%)" 
                fill="hsl(145, 45%, 35%)" 
                fillOpacity={0.2}
                strokeWidth={2}
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
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryDistribution.slice(0, 3).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
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
            {recentDonations.map((donation) => (
              <div key={donation.id} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{donation.donor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {donation.foodItems.length} items → {donation.organisation?.name}
                  </p>
                </div>
                <StatusBadge status={donation.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
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
            {recentDonors.map((donor) => (
              <div key={donor.id} className="p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {donor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{donor.name}</p>
                  <p className="text-sm text-muted-foreground">{donor.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{donor.totalDonations}</p>
                  <p className="text-xs text-muted-foreground">donations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
