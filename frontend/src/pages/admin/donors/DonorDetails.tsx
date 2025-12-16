import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, Package } from "lucide-react";

const DonorDetails = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/donors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setDonor(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!donor) return <div className="p-6">Loading donor...</div>;

  const donations = donor.donations || [];

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-10">

        {/* STATS (same style as RiderDetails) */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Donor Name */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1 max-w-[80%]">
              <p className="text-sm text-muted-foreground">Donor Name</p>
              <p className="text-xl font-semibold break-words">
                {donor.name}
              </p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-green-700" />
            </div>
          </div>

          {/* Email */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1 max-w-[80%]">
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p
                className="text-base font-medium text-gray-800 break-all"
                title={donor.email}
              >
                {donor.email}
              </p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-green-700" />
            </div>
          </div>

          {/* Total Donations */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Donations</p>
              <p className="text-3xl font-bold">
                {donations.length}
              </p>
            </div>
            <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-green-700" />
            </div>
          </div>

        </div>

        {/* DONATION HISTORY (same as Rider delivery history) */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-6">Donation History</h3>

          {donations.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              No donations yet
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((d: any) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-muted/40 hover:bg-muted transition"
                >
                  <div>
                    <p className="font-medium">Donation #{d.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {(d.foodItems?.length || 0)} items
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      d.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : d.status === "IN_TRANSIT"
                        ? "bg-blue-100 text-blue-700"
                        : d.status === "ASSIGNED"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DonorDetails;
