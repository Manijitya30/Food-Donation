import { Donation } from '@/lib/dummy-data';
import { StatusBadge } from './StatusBadge';
import { MapPin, Clock, User, Truck, Building2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { string } from 'zod';

interface DonationCardProps {
  donation: Donation;
  showDonor?: boolean;
  showRider?: boolean;
  showOrganisation?: boolean;
  onViewDetails?: () => void;
  className?: string;
}

export function DonationCard({
  donation,
  showDonor = true,
  showRider = true,
  showOrganisation = true,
  onViewDetails,
  className,
}: DonationCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={cn(
      "bg-card rounded-2xl p-5 shadow-md border border-border hover:shadow-lg transition-all duration-200",
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Donation ID</p>
          <p className="font-display font-bold text-foreground">{`${donation.id}`}</p>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      {/* Food Items */}
      <div className="mb-4 p-3 bg-accent/50 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Food Items</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {donation.foodItems.map((item) => (
            <span
              key={item.id}
              className="text-xs bg-card px-2 py-1 rounded-md border border-border text-foreground"
            >
              {item.name} ({item.quantity} {item.unit})
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        {showDonor && donation.donor && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span className="font-medium">Donor:</span>
            <span className="text-foreground">{donation.donor.name}</span>
          </div>
        )}

        {showRider && donation.rider && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-4 h-4 text-primary" />
            <span className="font-medium">Rider:</span>
            <span className="text-foreground">{donation.rider.name}</span>
          </div>
        )}

        {showOrganisation && donation.organisation && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="font-medium">To:</span>
            <span className="text-foreground">{donation.organisation.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">Pickup:</span>
          <span className="text-foreground truncate">{donation.pickupAddress}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-medium">Time:</span>
          <span className="text-foreground">{formatDate(donation.pickupTime)}</span>
        </div>
      </div>

      {/* Action */}
      {onViewDetails && (
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      )}
    </div>
  );
}
