import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DonationCard } from '@/components/shared/DonationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DonorDonations = () => {

  const [currentDonor, setCurrentDonor] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]); // backend data later

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Food item form state
  const [foodItems, setFoodItems] = useState([
    { name: '', quantity: 0, unit: '', category: 'cooked' }
  ]);
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load logged-in donor
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentDonor(JSON.parse(storedUser));
    }

    // TODO: Fetch donor donations from backend  
    // axios.get(`/api/donations/my`)
    // setDonations(res.data);

  }, []);

  if (!currentDonor) {
    return (
      <div className="p-6 text-center text-lg">Loading...</div>
    );
  }

  // Add, remove, update food items
  const addFoodItem = () => {
    setFoodItems([...foodItems, { name: '', quantity: 0, unit: '', category: 'cooked' }]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send this to backend
    const donationPayload = {
      donorId: currentDonor.id,
      foodItems,
      pickupTime,
      notes,
    };

    console.log("DONATION PAYLOAD -> ", donationPayload);

    toast({
      title: "Donation Created!",
      description: "A rider and organisation will be assigned shortly.",
    });

    setIsDialogOpen(false);
    setFoodItems([{ name: "", quantity: 0, unit: "", category: "cooked" }]);
    setPickupTime("");
    setNotes("");
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
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">My Donations</h2>
          <p className="text-sm text-muted-foreground">Manage and track your food donations</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4" /> Add Donation
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Create New Donation</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              
              {/* FOOD ITEMS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground font-semibold">Food Items</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addFoodItem}>
                    <Plus className="w-4 h-4 mr-1" /> Add Item
                  </Button>
                </div>

                {foodItems.map((item, index) => (
                  <div key={index} className="p-4 bg-accent/50 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Item {index + 1}</span>
                      {foodItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFoodItem(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Item Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Category</Label>
                        <select
                          className="w-full h-10 px-3 rounded-lg border"
                          value={item.category}
                          onChange={(e) => updateFoodItem(index, "category", e.target.value)}
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateFoodItem(index, "quantity", Number(e.target.value))
                          }
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Unit</Label>
                        <Input
                          value={item.unit}
                          onChange={(e) => updateFoodItem(index, "unit", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PICKUP DETAILS */}
              <div className="space-y-4">
                <Label className="font-semibold">Pickup Details</Label>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Pickup Address</Label>
                    <Input value={currentDonor.address} disabled className="bg-muted" />
                  </div>

                  <div>
                    <Label className="text-xs">Preferred Pickup Time</Label>
                    <Input
                      type="datetime-local"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Additional Notes</Label>
                  <Input
                    placeholder="Any special instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="hero" className="flex-1">
                  Create Donation
                </Button>
              </div>
            </form>

          </DialogContent>
        </Dialog>

      </div>

      {/* DONATIONS LIST */}
      {donations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} showDonor={false} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-12 text-center border border-border">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl mb-2">No donations yet</h3>
          <p className="text-muted-foreground mb-6">
            Start making a difference by donating your surplus food
          </p>
          <Button variant="hero" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4" /> Create Your First Donation
          </Button>
        </div>
      )}

      {/* FAB BUTTON */}
      <Button
        variant="fab"
        size="fab"
        className="fixed bottom-8 right-8 shadow-2xl"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

    </DashboardLayout>
  );
};

export default DonorDonations;
