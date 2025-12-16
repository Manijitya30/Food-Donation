import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/shared/StatsCard";
import { Truck, Package } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
const RiderDetails = () => {
  const { id } = useParams();
  const [rider, setRider] = useState<any>(null);

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/api/admin/riders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setRider(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!rider) return <div className="p-6">Loading rider...</div>;

  const deliveries = rider.donationsRide || [];

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

       <div className="grid md:grid-cols-3 gap-8">

  {/* Rider Name */}
  <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
    <div className="space-y-1 max-w-[80%]">
      <p className="text-sm text-muted-foreground">Rider Name</p>
      <p className="text-xl font-semibold leading-snug break-words">
        {rider.name}
      </p>
    </div>

    <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
      <Truck className="h-5 w-5 text-green-700" />
    </div>
  </div>

  {/* Email */}
  <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
    <div className="space-y-1 max-w-[80%]">
      <p className="text-sm text-muted-foreground">Email Address</p>
      <p className="text-base font-medium text-gray-800 break-all">
        {rider.email}
      </p>
    </div>

    <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
      <Truck className="h-5 w-5 text-green-700" />
    </div>
  </div>

  {/* Deliveries */}
  <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Total Deliveries</p>
      <p className="text-3xl font-bold">
        {deliveries.length}
      </p>
    </div>

    <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
      <Package className="h-5 w-5 text-green-700" />
    </div>
  </div>

</div>


        {/* DELIVERY HISTORY */}
       <div className="bg-card p-6 rounded-xl">
  <h3 className="font-bold text-lg mb-6">Delivery History</h3>

  {deliveries.length === 0 ? (
    <div className="text-center text-muted-foreground py-10">
      No deliveries yet
    </div>
  ) : (
    <div className="space-y-4">
      {deliveries.map((d: any) => (
        <div
          key={d.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-muted/40 hover:bg-muted transition"
        >
          <div>
            <p className="font-medium">Donation #{d.id}</p>
          </div>

         <StatusBadge status={d.status} />
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </DashboardLayout>
  );
};

export default RiderDetails;
