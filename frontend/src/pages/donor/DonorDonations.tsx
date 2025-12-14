import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DonationCard } from "@/components/shared/DonationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DonorDonations = () => {
  const [currentDonor, setCurrentDonor] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [foodItems, setFoodItems] = useState([
    { name: "", quantity: 0, unit: "", category: "cooked" },
  ]);
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");

  /* ================= LOAD USER + DONATIONS ================= */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setCurrentDonor(JSON.parse(user));

    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/donations/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDonations(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load donations",
        variant: "destructive",
      });
    }
  };

  if (!currentDonor) return <div className="p-6">Loading...</div>;

  /* ================= FOOD ITEMS ================= */
  const addFoodItem = () => {
    setFoodItems([...foodItems, { name: "", quantity: 0, unit: "", category: "cooked" }]);
  };

  const removeFoodItem = (index: number) => {
    if (foodItems.length > 1) {
      setFoodItems(foodItems.filter((_, i) => i !== index));
    }
  };

  const updateFoodItem = (index: number, field: string, value: any) => {
    const updated = [...foodItems];
    updated[index] = { ...updated[index], [field]: value };
    setFoodItems(updated);
  };

  /* ================= CREATE DONATION ================= */
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/donations",
      {
        pickupAddress: currentDonor.address,
        pickupTime,
        notes,
        foodItems,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast({
      title: "Donation Created!",
      description: "Rider and organisation assigned successfully",
    });

    setIsDialogOpen(false);
    setFoodItems([{ name: "", quantity: 0, unit: "", category: "cooked" }]);
    setPickupTime("");
    setNotes("");

    // reload donor donations
    fetchDonations();

  } catch (err: any) {
    console.error("CREATE DONATION ERROR:", err.response?.data);

    toast({
      title: "Failed to create donation",
      description: err.response?.data?.message || "Server error",
      variant: "destructive",
    });
  }
};


  const categories = [
    { value: "cooked", label: "Cooked Food" },
    { value: "raw", label: "Raw Ingredients" },
    { value: "packaged", label: "Packaged Food" },
    { value: "bakery", label: "Bakery Items" },
    { value: "dairy", label: "Dairy Products" },
    { value: "beverages", label: "Beverages" },
  ];

  return (
    <DashboardLayout role="donor" userName={currentDonor.name}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl">My Donations</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track your food donations
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4" /> Add Donation
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Donation</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {foodItems.map((item, index) => (
                <div key={index} className="p-4 bg-accent/50 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <span>Item {index + 1}</span>
                    {foodItems.length > 1 && (
                      <X onClick={() => removeFoodItem(index)} className="cursor-pointer" />
                    )}
                  </div>

                  <Input
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                    required
                  />

                  <select
                    className="w-full h-10 border rounded-lg px-3"
                    value={item.category}
                    onChange={(e) => updateFoodItem(index, "category", e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>

                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      updateFoodItem(index, "quantity", Number(e.target.value))
                    }
                    required
                  />

                  <Input
                    placeholder="Unit"
                    value={item.unit}
                    onChange={(e) => updateFoodItem(index, "unit", e.target.value)}
                    required
                  />
                </div>
              ))}

              <Button type="button" variant="ghost" onClick={addFoodItem}>
                <Plus className="w-4 h-4" /> Add Item
              </Button>

              <Input
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
              />

              <Input
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <Button type="submit" variant="hero" className="w-full">
                Create Donation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {donations.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => (
            <DonationCard key={d.id} donation={d} showDonor={false} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-xl">
          <Package className="mx-auto w-12 h-12" />
          <p>No donations yet</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DonorDonations;
