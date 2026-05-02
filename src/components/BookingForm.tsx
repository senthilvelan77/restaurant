import { useState } from 'react';
import { Restaurant } from '../types';
import { Button } from '../app/components/ui/button';
import { Input } from '../app/components/ui/input';
import { Label } from '../app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../app/components/ui/select';
import { Card } from '../app/components/ui/card';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface BookingFormProps {
  restaurant: Restaurant;
  onBack: () => void;
  onConfirm: (bookingData: BookingData) => void;
}

export interface BookingData {
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  amount: number;
}

export default function BookingForm({ restaurant, onBack, onConfirm }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // Calculate amount based on guests (₹500 base + ₹200 per additional guest)
  const calculateAmount = () => {
    const guestCount = parseInt(guests) || 1;
    return 500 + (guestCount - 1) * 200;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !guests) {
      toast.error('Please fill in all fields');
      return;
    }

    const bookingData: BookingData = {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      date,
      time,
      guests: parseInt(guests),
      amount: calculateAmount()
    };

    onConfirm(bookingData);
  };

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
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">{restaurant.name}</p>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                <Calendar size={18} />
                Select Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                <Clock size={18} />
                Select Time
              </Label>
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {restaurant.availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Guests */}
            <div>
              <Label htmlFor="guests" className="flex items-center gap-2 mb-2">
                <Users size={18} />
                Number of Guests
              </Label>
              <Select value={guests} onValueChange={setGuests} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">{restaurant.name}</span>
                </div>
                {date && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">
                      {new Date(date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {time && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{time}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-semibold">Booking Amount</span>
                  <span className="font-semibold text-green-600">
                    ₹{calculateAmount()}
                  </span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Proceed to Payment
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our terms and conditions
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
