import { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  Lock, 
  CreditCard, 
  Bell, 
  LogOut, 
  Menu 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrdersSection from '@/components/profile/OrdersSection';
import FavoritesSection from '@/components/profile/FavoritesSection';
import PersonalSection from '@/components/profile/PersonalSection';
import AddressesSection from '@/components/profile/AddressesSection';
import PasswordSection from '@/components/profile/PasswordSection';
import PaymentSection from '@/components/profile/PaymentSection';
import NotificationsSection from '@/components/profile/NotificationsSection';

type Section = 'orders' | 'favorites' | 'personal' | 'addresses' | 'password' | 'payment' | 'notifications';

const sidebarItems = [
  { id: 'orders' as Section, label: 'Orders', icon: ShoppingBag },
  { id: 'favorites' as Section, label: 'Favorites', icon: Heart },
  { id: 'personal' as Section, label: 'Personal Information', icon: User },
  { id: 'addresses' as Section, label: 'Addresses', icon: MapPin },
  { id: 'password' as Section, label: 'Change Password', icon: Lock },
  { id: 'payment' as Section, label: 'Payment', icon: CreditCard },
  { id: 'notifications' as Section, label: 'Notifications', icon: Bell },
];

export default function Profile() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersSection />;
      case 'favorites':
        return <FavoritesSection />;
      case 'personal':
        return <PersonalSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'password':
        return <PasswordSection />;
      case 'payment':
        return <PaymentSection />;
      case 'notifications':
        return <NotificationsSection />;
    }
  };

  return (
    <div className=" bg-background pt-10">
      <div className="mx-4 lg:mx-20 flex relative">
        {/* Sidebar - Hidden on md and smaller */}
        <div
          className={`fixed top-0 bottom-0 w-72 bg-card border-r transform transition-transform z-40 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* User Profile Section */}
          <div className="p-6 flex flex-col items-center text-center border-b mt-14">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-lg">John Doe</h2>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false); // Close sidebar after selection
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Sign Out Button */}
          {/* <div className="p-4  bottom-0">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 border rounded-lg transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={() => console.log('Logout')}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div> */}
        </div>

        {/* Sidebar Overlay - For Medium Screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)} // Close on overlay click
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 ml-0 lg:ml-72">
          {/* Mobile Header */}
          <header className="sticky top-14 z-10 flex items-center justify-between bg-card border-b px-4 py-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-muted"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold">
              {sidebarItems.find((item) => item.id === activeSection)?.label}
            </h1>
          </header>

          {/* Desktop Header */}
          <header className="sticky top-14 z-10 border-b bg-card hidden lg:block">
            <div className="px-8 py-6">
              <h1 className="text-2xl font-bold">
                {sidebarItems.find((item) => item.id === activeSection)?.label}
              </h1>
              <p className="text-muted-foreground">
                Manage your {activeSection === 'personal' ? 'personal information' : activeSection}
              </p>
            </div>
          </header>

          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
