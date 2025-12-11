import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { DonationCard } from '@/components/shared/DonationCard';
import { Button } from '@/components/ui/button';
import { donations, organisations } from '@/lib/dummy-data';
import { Package, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrganisationDashboard = () => {
  const currentOrg = organisations[0];
  const orgDonations = donations.filter(d => d.organisationId === currentOrg.id);
  const incomingDonations = orgDonations.filter(d => d.status !== 'delivered');
  const receivedDonations = orgDonations.filter(d => d.status === 'delivered');

  const capacityPercentage = Math.round((currentOrg.currentOccupancy / currentOrg.capacity) * 100);

  return (
    <DashboardLayout role="organisation" userName={currentOrg.name}>
      {/* Verification Banner */}
      {currentOrg.verified ? (
        <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success" />
          <div>
            <p className="font-semibold text-foreground">Verified Organisation</p>
            <p className="text-sm text-muted-foreground">Your organisation is verified and can receive donations</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-warning" />
            <div>
              <p className="font-semibold text-foreground">Verification Pending</p>
              <p className="text-sm text-muted-foreground">Your organisation is under review</p>
            </div>
          </div>
          <Button variant="warning" size="sm">Check Status</Button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Received"
          value={receivedDonations.length + 45}
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
          value={currentOrg.currentOccupancy}
          icon={Users}
          subtitle={`of ${currentOrg.capacity} capacity`}
        />
        <StatsCard
          title="Meals Served"
          value="8,420"
          icon={TrendingUp}
          subtitle="This month"
        />
      </div>

      {/* Capacity Progress */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">Current Capacity</h3>
            <p className="text-sm text-muted-foreground">
              {currentOrg.currentOccupancy} of {currentOrg.capacity} people
            </p>
          </div>
          <span className={`text-2xl font-bold ${
            capacityPercentage > 90 ? 'text-destructive' :
            capacityPercentage > 70 ? 'text-warning' : 'text-success'
          }`}>
            {capacityPercentage}%
          </span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              capacityPercentage > 90 ? 'bg-destructive' :
              capacityPercentage > 70 ? 'bg-warning' : 'bg-success'
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
                onViewDetails={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No incoming donations</h3>
            <p className="text-sm text-muted-foreground">
              New donations will appear here when assigned to your organisation
            </p>
          </div>
        )}
      </div>

      {/* Recent Receipts */}
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
              Your received donations will appear here
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrganisationDashboard;
