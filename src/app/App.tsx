import { useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { mockRestaurants } from '../data/mockRestaurants';
import { Restaurant } from '../types';
import { Toaster } from 'sonner';

import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';
import RestaurantList from '../components/RestaurantList';
import RestaurantDetails from '../components/RestaurantDetails';
import BookingForm, { BookingData } from '../components/BookingForm';
import Payment from '../components/Payment';
import BookingConfirmation from '../components/BookingConfirmation';
import UserDashboard from '../components/UserDashboard';

type View =
  | 'home'
  | 'auth'
  | 'restaurantDetails'
  | 'booking'
  | 'payment'
  | 'confirmation'
  | 'dashboard';

function AppContent() {
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurantDetails');
  };

  const handleBookNow = () => {
    if (!currentUser) {
      setCurrentView('auth');
      return;
    }
    setCurrentView('booking');
  };

  const handleBookingConfirm = (data: BookingData) => {
    setBookingData(data);
    setCurrentView('payment');
  };

  const handlePaymentSuccess = (bookingId: string) => {
    setConfirmedBookingId(bookingId);
    setCurrentView('confirmation');
  };

  const handleGoHome = () => {
    setSelectedRestaurant(null);
    setBookingData(null);
    setConfirmedBookingId('');
    setCurrentView('home');
  };

  const handleViewDashboard = () => {
    if (!currentUser) {
      setCurrentView('auth');
      return;
    }
    setCurrentView('dashboard');
  };

  const handleAuthSuccess = () => {
    if (selectedRestaurant) {
      setCurrentView('booking');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => setCurrentView('auth')}
        onDashboardClick={handleViewDashboard}
      />

      {currentView === 'home' && (
        <RestaurantList
          restaurants={mockRestaurants}
          onRestaurantClick={handleRestaurantClick}
        />
      )}

      {currentView === 'auth' && (
        <div className="container mx-auto px-4 py-12">
          {authMode === 'login' ? (
            <Login
              onSwitch={() => setAuthMode('signup')}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <Signup
              onSwitch={() => setAuthMode('login')}
              onSuccess={handleAuthSuccess}
            />
          )}
        </div>
      )}

      {currentView === 'restaurantDetails' && selectedRestaurant && (
        <RestaurantDetails
          restaurant={selectedRestaurant}
          onBack={handleGoHome}
          onBookNow={handleBookNow}
        />
      )}

      {currentView === 'booking' && selectedRestaurant && (
        <BookingForm
          restaurant={selectedRestaurant}
          onBack={() => setCurrentView('restaurantDetails')}
          onConfirm={handleBookingConfirm}
        />
      )}

      {currentView === 'payment' && bookingData && (
        <Payment
          bookingData={bookingData}
          onBack={() => setCurrentView('booking')}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {currentView === 'confirmation' && confirmedBookingId && (
        <BookingConfirmation
          bookingId={confirmedBookingId}
          onGoHome={handleGoHome}
          onViewBookings={handleViewDashboard}
        />
      )}

      {currentView === 'dashboard' && (
        <UserDashboard onBack={handleGoHome} />
      )}

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}