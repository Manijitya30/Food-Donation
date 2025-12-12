import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { DonationCard } from '@/components/shared/DonationCard';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrganisationDashboard = () => {
  // ✅ Load logged-in organisation from localStorage
  const [currentOrg, setCurrentOrg] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentOrg(JSON.parse(storedUser));
    }
  }, []);

  // For now, donations remain empty until backend integration
  const orgDonations: any[] = [];
  const incomingDonations: any[] = [];
  const receivedDonations: any[] = [];

  if (!currentOrg) {
    return <div className="p-6 text-center text-lg">Loading organisation...</div>;
  }

  // Capacity values come from DB signup
  const capacity = currentOrg.capacity || 0;
  const occupancy = currentOrg.currentOccupancy || 0;

  const capacityPercentage =
    capacity > 0 ? Math.round((occupancy / capacity) * 100) : 0;

  return (
    <DashboardLayout role="organisation" userName={currentOrg.name}>
      {/* Verification Banner */}
      {currentOrg.verified ? (
        <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success" />
          <div>
            <p className="font-semibold text-foreground">Verified Organisation</p>
            <p className="text-sm text-muted-foreground">
              Your organisation is verified and can receive donations
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-warning" />
            <div>
              <p className="font-semibold text-foreground">Verification Pending</p>
              <p className="text-sm text-muted-foreground">
                Your organisation is under review
              </p>
            </div>
          </div>
          <Button variant="warning" size="sm">Check Status</Button>
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
          value="0"
          icon={TrendingUp}
          subtitle="This month"
        />
      </div>

      {/* Capacity Section */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">Current Capacity</h3>
            <p className="text-sm text-muted-foreground">
              {occupancy} of {capacity} people
            </p>
          </div>
          <span
            className={`text-2xl font-bold ${
              capacityPercentage > 90
                ? 'text-destructive'
                : capacityPercentage > 70
                ? 'text-warning'
                : 'text-success'
            }`}
          >
            {capacityPercentage}%
          </span>
        </div>

        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              capacityPercentage > 90
                ? 'bg-destructive'
                : capacityPercentage > 70
                ? 'bg-warning'
                : 'bg-success'
            }`}
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
      </div>

      {/* Incoming Donations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">Incoming Donations</h2>
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
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No incoming donations</h3>
            <p className="text-sm text-muted-foreground">
              New donations will appear here when assigned to your organisation.
            </p>
          </div>
        )}
      </div>

      {/* Received Donations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">Recently Received</h2>
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
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground">No received donations yet</h3>
            <p className="text-sm text-muted-foreground">
              Your received donations will appear here.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrganisationDashboard;
