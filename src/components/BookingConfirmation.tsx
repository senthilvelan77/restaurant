import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Booking } from '../types';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';
import { CheckCircle, Calendar, Clock, Users, MapPin, Loader2 } from 'lucide-react';

interface BookingConfirmationProps {
  bookingId: string;
  onGoHome: () => void;
  onViewBookings: () => void;
}

export default function BookingConfirmation({
  bookingId,
  onGoHome,
  onViewBookings
}: BookingConfirmationProps) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
        if (bookingDoc.exists()) {
          setBooking(bookingDoc.data() as Booking);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Booking not found</p>
          <Button onClick={onGoHome} className="mt-4">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your table has been successfully reserved
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Booking ID</span>
              <span className="font-mono font-semibold text-green-700">
                {booking.id}
              </span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Restaurant</p>
                <p className="font-semibold">{booking.restaurantName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">
                  {new Date(booking.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold">{booking.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Number of Guests</p>
                <p className="font-semibold">
                  {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{booking.amount}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2">Important Information</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Please arrive 10 minutes before your booking time</li>
            <li>• A confirmation email has been sent to your registered email</li>
            <li>• Present your Booking ID at the restaurant</li>
            <li>• You can view or cancel this booking from "My Bookings"</li>
          </ul>
        </Card>

        <div className="flex gap-4">
          <Button onClick={onGoHome} variant="outline" className="flex-1">
            Back to Home
          </Button>
          <Button onClick={onViewBookings} className="flex-1">
            View My Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}
