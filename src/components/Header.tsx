import { useAuth } from '../context/AuthContext';
import { Button } from '../app/components/ui/button';
import { User, LogOut, Calendar } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

export default function Header({ onLoginClick, onDashboardClick }: HeaderProps) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-red-600">TableBook</h1>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm">{currentUser.displayName || currentUser.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDashboardClick}
                  className="flex items-center gap-2"
                >
                  <Calendar size={16} />
                  My Bookings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={onLoginClick}>Login / Sign Up</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
