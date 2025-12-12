import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { DonationCard } from '@/components/shared/DonationCard';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  // ✅ Load real logged-in user
  const currentDonor = JSON.parse(localStorage.getItem("user") || "{}");

  // For now, remove dummy data (until real backend donations exist)
  const donorDonations: any[] = [];
  const activeDonations: any[] = [];
  const completedDonations: any[] = [];

  return (
    <DashboardLayout role="donor" userName={currentDonor?.name}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Donations"
          value={currentDonor.totalDonations || 0}
          icon={Package}
          trend="+12% from last month"
          trendUp
        />

        <StatsCard
          title="Active Donations"
          value={activeDonations.length}
          icon={Clock}
          subtitle="Currently in progress"
        />
        <StatsCard
          title="Completed"
          value={completedDonations.length}
          icon={CheckCircle}
          subtitle="Successfully delivered"
        />
        <StatsCard
          title="Impact Score"
          value="A+"
          icon={TrendingUp}
          subtitle="Top 10% donor"
        />
      </div>

      {/* Active Donations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">Active Donations</h2>
          <Link to="/donor/donations">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        {activeDonations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDonations.slice(0, 3).map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                showDonor={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No active donations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start making a difference by donating surplus food
            </p>
            <Link to="/donor/donations">
              <Button variant="hero">
                <Plus className="w-4 h-4" />
                Add Donation
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">Recent Deliveries</h2>
          <Link to="/donor/history">
            <Button variant="ghost" size="sm">View History</Button>
          </Link>
        </div>
        {completedDonations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedDonations.slice(0, 3).map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                showDonor={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground">No completed donations yet</h3>
            <p className="text-sm text-muted-foreground">
              Your completed donations will appear here
            </p>
          </div>
        )}
      </div>

      {/* FAB */}
      <Link to="/donor/donations" className="fixed bottom-8 right-8">
        <Button variant="fab" size="fab" className="shadow-2xl">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </DashboardLayout>
  );
};

export default DonorDashboard;
