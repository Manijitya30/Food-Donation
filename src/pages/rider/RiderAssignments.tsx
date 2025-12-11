import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { donations, riders, Donation } from '@/lib/dummy-data';
import { MapPin, Phone, User, Building2, Package, Clock, Navigation, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const RiderAssignments = () => {
  const currentRider = riders[0];
  const [riderDeliveries, setRiderDeliveries] = useState(
    donations.filter(d => d.riderId === currentRider.id && d.status !== 'delivered')
  );
  const { toast } = useToast();

  const updateStatus = (donationId: string, newStatus: Donation['status']) => {
    setRiderDeliveries(prev => 
      prev.map(d => d.id === donationId ? { ...d, status: newStatus } : d)
    );
    toast({
      title: 'Status Updated',
      description: `Delivery status changed to ${newStatus.replace('_', ' ')}`,
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNextAction = (status: Donation['status']) => {
    const actions = {
      pending: { label: 'Accept', next: 'assigned' as const },
      assigned: { label: 'Start Pickup', next: 'picked_up' as const },
      picked_up: { label: 'Start Delivery', next: 'in_transit' as const },
      in_transit: { label: 'Mark Delivered', next: 'delivered' as const },
      delivered: null,
    };
    return actions[status];
  };

  return (
    <DashboardLayout role="rider" userName={currentRider.name}>
      <div className="mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">Active Assignments</h2>
        <p className="text-sm text-muted-foreground">Manage your current deliveries</p>
      </div>

      {riderDeliveries.length > 0 ? (
        <div className="space-y-6">
          {riderDeliveries.map((delivery) => {
            const action = getNextAction(delivery.status);
            
            return (
              <div 
                key={delivery.id} 
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Delivery ID</p>
                    <p className="font-display font-bold text-lg text-foreground">{delivery.id.toUpperCase()}</p>
                  </div>
                  <StatusBadge status={delivery.status} />
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-6">
                  {/* Pickup Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">P</span>
                      </div>
                      Pickup From
                    </h3>
                    <div className="p-4 bg-accent/50 rounded-xl space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{delivery.donor.name}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm text-muted-foreground">{delivery.pickupAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{delivery.donor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Pickup: {formatTime(delivery.pickupTime)}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Navigation className="w-4 h-4" />
                      Navigate to Pickup
                    </Button>
                  </div>

                  {/* Delivery Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-secondary">D</span>
                      </div>
                      Deliver To
                    </h3>
                    <div className="p-4 bg-accent/50 rounded-xl space-y-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{delivery.organisation?.name}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm text-muted-foreground">{delivery.organisation?.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{delivery.organisation?.phone}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Navigation className="w-4 h-4" />
                      Navigate to Delivery
                    </Button>
                  </div>
                </div>

                {/* Food Items */}
                <div className="px-5 pb-5">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">Food Items</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {delivery.foodItems.map((item) => (
                        <span
                          key={item.id}
                          className="text-sm bg-card px-3 py-1 rounded-lg border border-border text-foreground"
                        >
                          {item.name} ({item.quantity} {item.unit})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {action && (
                  <div className="p-5 border-t border-border bg-accent/30">
                    <Button 
                      variant={action.next === 'delivered' ? 'success' : 'hero'}
                      className="w-full"
                      onClick={() => updateStatus(delivery.id, action.next)}
                    >
                      {action.next === 'delivered' && <CheckCircle className="w-4 h-4" />}
                      {action.label}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-12 text-center border border-border">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-foreground mb-2">No active assignments</h3>
          <p className="text-muted-foreground">
            New delivery assignments will appear here when available
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RiderAssignments;
