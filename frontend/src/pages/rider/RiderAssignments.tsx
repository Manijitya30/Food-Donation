import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  User,
  Building2,
  Package,
  Clock,
  Navigation,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RiderAssignments = () => {
  const [currentRider, setCurrentRider] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const { toast } = useToast();

  const token = localStorage.getItem("token");

  /* ================= LOAD RIDER + ASSIGNMENTS ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentRider(JSON.parse(storedUser));

    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/donations/rider",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssignments(res.data);
    } catch (err) {
      console.error("Failed to fetch assignments", err);
    }
  };

  /* ================= ACTION HANDLERS ================= */

  const handleRiderAction = async (
    donationId: number,
    action: "ACCEPT" | "REJECT"
  ) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/donations/${donationId}/rider-action`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description:
          action === "ACCEPT"
            ? "Donation accepted"
            : "Donation rejected",
      });

      fetchAssignments();
    } catch (err) {
      toast({
        title: "Error",
        description: "Action failed",
        variant: "destructive",
      });
    }
  };

  const updateStatus = async (donationId: number, status: string) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/donations/${donationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Status Updated",
        description: `Marked as ${status.replace("_", " ")}`,
      });

      fetchAssignments();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (!currentRider) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  /* ================= HELPERS ================= */

  const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getNextAction = (status: string) => {
    const steps: any = {
      PENDING: { label: "Accept Assignment", next: "ACCEPT" },
      ASSIGNED: { label: "Start Pickup", next: "PICKED_UP" },
      PICKED_UP: { label: "Start Delivery", next: "IN_TRANSIT" },
      IN_TRANSIT: { label: "Mark Delivered", next: "DELIVERED" },
    };
    return steps[status] || null;
  };

  return (
    <DashboardLayout role="rider" userName={currentRider.name}>
      <div className="mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Active Assignments
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your current deliveries
        </p>
      </div>

      {assignments.length > 0 ? (
        <div className="space-y-6">
          {assignments.map((delivery) => {
            const action = getNextAction(delivery.status);

            return (
              <div
                key={delivery.id}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <div className="p-5 border-b border-border flex justify-between">
                  <p className="font-bold">{delivery.id}</p>
                  <StatusBadge status={delivery.status} />
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold mb-2">Pickup</p>
                    <p>{delivery.donor.name}</p>
                    <p>{delivery.pickupAddress}</p>
                    <p>{formatTime(delivery.pickupTime)}</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Deliver To</p>
                    <p>{delivery.organisation?.name}</p>
                    <p>{delivery.organisation?.address}</p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {delivery.foodItems.map((item: any) => (
                      <span key={item.id} className="px-3 py-1 border rounded">
                        {item.name} ({item.quantity} {item.unit})
                      </span>
                    ))}
                  </div>
                </div>

                {delivery.status === "PENDING" && (
                  <div className="p-5 flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() =>
                        handleRiderAction(delivery.id, "ACCEPT")
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() =>
                        handleRiderAction(delivery.id, "REJECT")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {action && action.next !== "ACCEPT" && (
                  <div className="p-5">
                    <Button
                      className="w-full"
                      onClick={() =>
                        updateStatus(delivery.id, action.next)
                      }
                    >
                      {action.label}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center">No active assignments</div>
      )}
    </DashboardLayout>
  );
};

export default RiderAssignments;
