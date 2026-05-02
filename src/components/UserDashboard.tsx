import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking } from '../types';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UserDashboardProps {
  onBack: () => void;
}

export default function UserDashboard({ onBack }: UserDashboardProps) {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  const fetchBookings = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const bookingsData: Booking[] = [];

      querySnapshot.forEach((doc) => {
        bookingsData.push(doc.data() as Booking);
      });

      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'cancelled'
      });

      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isPastBooking = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date} ${time}`);
    return bookingDateTime < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-4">You don't have any bookings yet</p>
            <Button onClick={onBack}>Browse Restaurants</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {booking.restaurantName}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      ID: {booking.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(booking.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Guests</p>
                      <p className="font-medium">
                        {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-semibold text-green-600">₹{booking.amount}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  {booking.status === 'confirmed' && !isPastBooking(booking.date, booking.time) && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="flex items-center gap-2"
                    >
                      {cancellingId === booking.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <XCircle size={16} />
                          Cancel Booking
                        </>
                      )}
                    </Button>
                  )}

                  {isPastBooking(booking.date, booking.time) && (
                    <span className="text-sm text-gray-500">
                      This booking has passed
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  Booked on {new Date(booking.createdAt).toLocaleString('en-IN')}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
