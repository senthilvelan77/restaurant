import { Restaurant } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Spoon',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'
    ],
    rating: 4.5,
    cuisine: ['Italian', 'Continental'],
    priceRange: '₹₹₹',
    location: 'Mumbai, Maharashtra',
    description: 'Experience fine dining with authentic Italian cuisine in an elegant atmosphere. Our chefs use only the freshest ingredients to create memorable dishes.',
    menu: [
      {
        id: 'm1',
        name: 'Margherita Pizza',
        price: 450,
        description: 'Classic Italian pizza with fresh mozzarella and basil',
        category: 'Main Course'
      },
      {
        id: 'm2',
        name: 'Pasta Carbonara',
        price: 550,
        description: 'Creamy pasta with bacon and parmesan',
        category: 'Main Course'
      },
      {
        id: 'm3',
        name: 'Tiramisu',
        price: 280,
        description: 'Classic Italian dessert with coffee and mascarpone',
        category: 'Dessert'
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Rahul Sharma',
        rating: 5,
        comment: 'Amazing food and excellent service! Highly recommended.',
        date: '2026-04-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Priya Patel',
        rating: 4,
        comment: 'Great ambiance, but a bit pricey.',
        date: '2026-04-20'
      }
    ],
    availableSlots: ['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
  },
  {
    id: '2',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    images: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    ],
    rating: 4.3,
    cuisine: ['Indian', 'North Indian'],
    priceRange: '₹₹',
    location: 'Delhi, India',
    description: 'Traditional Indian flavors with a modern twist. Famous for our tandoori dishes and rich curries.',
    menu: [
      {
        id: 'm4',
        name: 'Butter Chicken',
        price: 380,
        description: 'Tender chicken in rich tomato-butter gravy',
        category: 'Main Course'
      },
      {
        id: 'm5',
        name: 'Paneer Tikka',
        price: 320,
        description: 'Grilled cottage cheese with spices',
        category: 'Starter'
      },
      {
        id: 'm6',
        name: 'Gulab Jamun',
        price: 120,
        description: 'Sweet milk solids in sugar syrup',
        category: 'Dessert'
      }
    ],
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Amit Kumar',
        rating: 5,
        comment: 'Best Indian food in the city!',
        date: '2026-04-25'
      }
    ],
    availableSlots: ['11:30 AM', '12:30 PM', '1:30 PM', '7:30 PM', '8:30 PM']
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    images: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
    ],
    rating: 4.7,
    cuisine: ['Seafood', 'Coastal'],
    priceRange: '₹₹₹₹',
    location: 'Goa, India',
    description: 'Fresh seafood caught daily, prepared with authentic coastal spices. Stunning ocean views.',
    menu: [
      {
        id: 'm7',
        name: 'Grilled Prawns',
        price: 680,
        description: 'Fresh prawns grilled to perfection',
        category: 'Main Course'
      },
      {
        id: 'm8',
        name: 'Fish Tikka',
        price: 520,
        description: 'Marinated fish in tandoor',
        category: 'Starter'
      }
    ],
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Neha Singh',
        rating: 5,
        comment: 'Absolutely loved the seafood and the view!',
        date: '2026-04-28'
      }
    ],
    availableSlots: ['12:00 PM', '1:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
  },
  {
    id: '4',
    name: 'Cafe Mocha',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'
    ],
    rating: 4.2,
    cuisine: ['Cafe', 'Continental', 'Desserts'],
    priceRange: '₹₹',
    location: 'Bangalore, Karnataka',
    description: 'Cozy cafe perfect for coffee lovers and dessert enthusiasts. Great ambiance for work or relaxation.',
    menu: [
      {
        id: 'm9',
        name: 'Cappuccino',
        price: 180,
        description: 'Rich espresso with steamed milk',
        category: 'Beverages'
      },
      {
        id: 'm10',
        name: 'Chocolate Cake',
        price: 220,
        description: 'Decadent chocolate layered cake',
        category: 'Dessert'
      }
    ],
    reviews: [],
    availableSlots: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM', '5:00 PM']
  },
  {
    id: '5',
    name: 'Dragon Wok',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
    ],
    rating: 4.4,
    cuisine: ['Chinese', 'Asian'],
    priceRange: '₹₹',
    location: 'Kolkata, West Bengal',
    description: 'Authentic Chinese cuisine with a wide variety of dim sum, noodles, and stir-fry dishes.',
    menu: [
      {
        id: 'm11',
        name: 'Hakka Noodles',
        price: 280,
        description: 'Stir-fried noodles with vegetables',
        category: 'Main Course'
      },
      {
        id: 'm12',
        name: 'Spring Rolls',
        price: 180,
        description: 'Crispy vegetable rolls',
        category: 'Starter'
      }
    ],
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Sanjay Gupta',
        rating: 4,
        comment: 'Good food, reasonable prices.',
        date: '2026-04-30'
      }
    ],
    availableSlots: ['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM']
  },
  {
    id: '6',
    name: 'La Bella Vista',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    ],
    rating: 4.6,
    cuisine: ['Mexican', 'Latin American'],
    priceRange: '₹₹₹',
    location: 'Pune, Maharashtra',
    description: 'Vibrant Mexican restaurant with authentic tacos, burritos, and margaritas.',
    menu: [
      {
        id: 'm13',
        name: 'Chicken Tacos',
        price: 380,
        description: 'Soft tacos with grilled chicken',
        category: 'Main Course'
      },
      {
        id: 'm14',
        name: 'Nachos Supreme',
        price: 320,
        description: 'Loaded nachos with cheese and salsa',
        category: 'Starter'
      }
    ],
    reviews: [],
    availableSlots: ['12:30 PM', '1:30 PM', '7:30 PM', '8:30 PM', '9:30 PM']
  }
];
