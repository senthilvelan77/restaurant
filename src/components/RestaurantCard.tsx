import { Restaurant } from '../types';
import { Star, MapPin } from 'lucide-react';
import { Card } from '../app/components/ui/card';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
            <Star size={14} fill="white" />
            <span>{restaurant.rating}</span>
          </div>
          <span className="text-gray-600 text-sm">
            {restaurant.cuisine.join(', ')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          <MapPin size={16} />
          <span>{restaurant.location}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-gray-700 font-medium">{restaurant.priceRange}</span>
          <span className="text-sm text-gray-500">
            {restaurant.reviews.length} reviews
          </span>
        </div>
      </div>
    </Card>
  );
}
