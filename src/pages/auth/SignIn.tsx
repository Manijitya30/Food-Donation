import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'donor' | 'rider' | 'organisation' | 'admin';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    { value: 'donor' as UserRole, label: 'Donor', description: 'Donate surplus food' },
    { value: 'rider' as UserRole, label: 'Rider', description: 'Deliver donations' },
    { value: 'organisation' as UserRole, label: 'Organisation', description: 'Receive donations' },
    { value: 'admin' as UserRole, label: 'Admin', description: 'Manage platform' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Welcome back!',
        description: `Signed in as ${selectedRole}`,
      });
      navigate(`/${selectedRole}/dashboard`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
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
              <h1 className="font-display font-bold text-2xl text-foreground">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">Sign in to continue to NourishNet</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-foreground">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedRole === role.value
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold text-foreground">{role.label}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Every Meal Matters
          </h2>
          <p className="text-primary-foreground/80">
            Join our community of donors, riders, and organizations working together to ensure no food goes to waste and no one goes hungry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
