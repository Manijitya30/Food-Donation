import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Home, 
  History, 
  User, 
  LogOut, 
  Package, 
  Truck, 
  Building2, 
  BarChart3,
  Users,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type UserRole = 'donor' | 'rider' | 'organisation' | 'admin';

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName?: string;
}

const navigationConfig = {
  donor: [
    { label: 'Dashboard', icon: Home, path: '/donor/dashboard' },
    { label: 'My Donations', icon: Package, path: '/donor/donations' },
    { label: 'History', icon: History, path: '/donor/history' },
    { label: 'Profile', icon: User, path: '/donor/profile' },
  ],
  rider: [
    { label: 'Dashboard', icon: Home, path: '/rider/dashboard' },
    { label: 'Assignments', icon: Truck, path: '/rider/assignments' },
    { label: 'Completed', icon: History, path: '/rider/completed' },
    { label: 'Profile', icon: User, path: '/rider/profile' },
  ],
  organisation: [
    { label: 'Dashboard', icon: Home, path: '/organisation/dashboard' },
    { label: 'Incoming', icon: Package, path: '/organisation/incoming' },
    { label: 'History', icon: History, path: '/organisation/history' },
    { label: 'Profile', icon: Building2, path: '/organisation/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { label: 'Donations', icon: Package, path: '/admin/donations' },
    { label: 'Donors', icon: Users, path: '/admin/donors' },
    { label: 'Riders', icon: Truck, path: '/admin/riders' },
    { label: 'Organisations', icon: Building2, path: '/admin/organisations' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
};

const roleLabels = {
  donor: 'Donor',
  rider: 'Rider',
  organisation: 'Organisation',
  admin: 'Admin',
};

export function DashboardLayout({ children, role, userName = 'User' }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = navigationConfig[role];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col z-40">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-foreground">
                Nourish<span className="text-primary">Net</span>
              </span>
              <p className="text-xs text-muted-foreground">{roleLabels[role]} Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display font-bold text-xl text-foreground">
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
