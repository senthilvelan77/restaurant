import { Restaurant } from '../types';
import { Star, MapPin, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '../app/components/ui/button';
import { Card } from '../app/components/ui/card';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onBack: () => void;
  onBookNow: () => void;
}

export default function RestaurantDetails({ restaurant, onBack, onBookNow }: RestaurantDetailsProps) {
  const displayImages = restaurant.images || [restaurant.image];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Restaurants
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={displayImages[0]}
              alt={restaurant.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {displayImages.slice(1, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${restaurant.name} ${idx + 2}`}
                className="w-full h-44 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded">
                <Star size={18} fill="white" />
                <span className="font-semibold">{restaurant.rating}</span>
              </div>
              <span className="text-gray-600">
                {restaurant.cuisine.join(', ')}
              </span>
              <span className="text-gray-700 font-medium">
                {restaurant.priceRange}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin size={20} />
              <span>{restaurant.location}</span>
            </div>

            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
            </Card>

            {/* Menu */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Menu</h2>
              <div className="space-y-4">
                {restaurant.menu.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b pb-4 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <span className="text-xs text-gray-500 mt-1 inline-block">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-semibold text-green-600">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            {restaurant.reviews.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {restaurant.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                          <Star size={12} fill="white" />
                          <span>{review.rating}</span>
                        </div>
                        <span className="font-semibold">{review.userName}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Book a Table</h3>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock size={18} />
                  <span className="font-medium">Available Slots</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.availableSlots.slice(0, 3).map((slot, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-3 py-1 rounded text-sm"
                    >
                      {slot}
                    </span>
                  ))}
                  {restaurant.availableSlots.length > 3 && (
                    <span className="text-gray-500 text-sm">
                      +{restaurant.availableSlots.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={onBookNow}
              >
                Book Now
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                You'll be asked to select date, time, and number of guests
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
