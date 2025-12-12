import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft, User, Truck, Building2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from "axios"; 
type UserRole = 'donor' | 'rider' | 'organisation';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'donor';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  
  // Additional fields based on role
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [orgType, setOrgType] = useState('');
  const [capacity, setCapacity] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    { value: 'donor' as UserRole, label: 'Donor', icon: User, description: 'I want to donate food' },
    { value: 'rider' as UserRole, label: 'Rider', icon: Truck, description: 'I want to deliver food' },
    { value: 'organisation' as UserRole, label: 'Organisation', icon: Building2, description: 'I want to receive food' },
  ];

 

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    const payload: any = {
      name,
      email,
      phone,
      address,
      password,
      role: selectedRole.toUpperCase(),
    };

    if (selectedRole === "rider") {
      payload.vehicleType = vehicleType;
      payload.vehicleNumber = vehicleNumber;
    }

    if (selectedRole === "organisation") {
      payload.organisationType = orgType;
      payload.capacity = Number(capacity);
    }

    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      payload
    );

    toast({
      title: "Account created!",
      description: "Your account has been created successfully",
    });

    // 🔥 SAVE TOKEN + USER INFO
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);
    }

    // Redirect based on role
    switch (selectedRole) {
      case "donor":
        navigate("/donor/dashboard");
        break;
      case "rider":
        navigate("/rider/dashboard");
        break;
      case "organisation":
        navigate("/organisation/dashboard");
        break;
      default:
        navigate("/");
    }
  } catch (err: any) {
    toast({
      title: "Signup Failed",
      description: err.response?.data?.message || "Something went wrong",
      variant: "destructive",
    });
  }

  setIsLoading(false);
};



  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Be part of a community that's changing the way we think about food waste and hunger.
          </p>
          <div className="space-y-4 text-left">
            {['Quick and easy registration', 'Connect with your community', 'Make a real impact', 'Track your contributions'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">Create Account</h1>
              <p className="text-sm text-muted-foreground">Join NourishNet today</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-foreground">I want to register as</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      selectedRole === role.value
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <role.icon className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-semibold text-sm text-foreground">{role.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  {selectedRole === 'organisation' ? 'Organization Name' : 'Full Name'}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={selectedRole === 'organisation' ? 'Hope Foundation' : 'John Doe'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123, Main Street, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {/* Rider-specific fields */}
              {selectedRole === 'rider' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType" className="text-foreground">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      type="text"
                      placeholder="Motorcycle / Van"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber" className="text-foreground">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      type="text"
                      placeholder="KA-01-AB-1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {/* Organisation-specific fields */}
              {selectedRole === 'organisation' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgType" className="text-foreground">Organization Type</Label>
                    <Input
                      id="orgType"
                      type="text"
                      placeholder="NGO / Shelter / Orphanage"
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-foreground">Capacity (people)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="100"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/signin" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
