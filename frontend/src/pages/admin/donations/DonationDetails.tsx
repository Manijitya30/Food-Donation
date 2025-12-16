import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Package, User, Building2, Truck } from "lucide-react";

const DonationDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/donations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!data) return <div className="p-6">Loading donation...</div>;

  const itemsCount = data.foodItems?.length || 0;

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

        {/* HEADER */}
        <h2 className="text-xl font-bold">
          Donation #{data.id}
        </h2>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Status */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-xl font-semibold">{data.status}</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-green-700" />
            </div>
          </div>

          {/* Items */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Food Items</p>
              <p className="text-3xl font-bold">{itemsCount}</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-green-700" />
            </div>
          </div>

          {/* Donor */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1 max-w-[80%]">
              <p className="text-sm text-muted-foreground">Donor</p>
              <p className="text-xl font-semibold break-words">
                {data.donor?.name || "Unknown"}
              </p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-green-700" />
            </div>
          </div>

        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Organisation */}
          <div className="bg-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Organisation</h3>
            </div>
            <p className="text-muted-foreground">
              {data.organisation?.user?.name || "Not assigned"}
            </p>
          </div>

          {/* Rider */}
          <div className="bg-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Rider</h3>
            </div>
            <p className="text-muted-foreground">
              {data.rider?.name || "Not assigned"}
            </p>
          </div>

        </div>

        {/* FOOD ITEMS */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-6">Food Items</h3>

          {itemsCount === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              No food items
            </div>
          ) : (
            <div className="space-y-3">
              {data.foodItems.map((f: any) => (
                <div
                  key={f.id}
                  className="flex justify-between p-4 rounded-lg border bg-muted/40"
                >
                  <p className="font-medium">{f.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {f.quantity} {f.unit}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DonationDetails;
