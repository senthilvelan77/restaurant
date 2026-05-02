# Restaurant Booking Application - Setup Guide

A full-stack restaurant booking web application similar to Zomato with table booking, online payment, and booking confirmation system.

## 🎯 Features

- ✅ User Authentication (Email/Password)
- ✅ Restaurant Listing with Search & Filters
- ✅ Restaurant Details Page
- ✅ Table Booking System
- ✅ Payment Integration (Razorpay/Demo Mode)
- ✅ Booking Confirmation
- ✅ User Dashboard
- ✅ Booking Management (View/Cancel)

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payment**: Razorpay (with demo mode for testing)
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📋 Prerequisites

1. Node.js (v18 or higher)
2. Firebase Account
3. Razorpay Account (optional, for real payments)

## 🚀 Setup Instructions

### Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing one)
3. Enable Authentication:
   - Go to **Build** → **Authentication**
   - Click **Get Started**
   - Enable **Email/Password** sign-in method

4. Create Firestore Database:
   - Go to **Build** → **Firestore Database**
   - Click **Create database**
   - Choose **Start in test mode** (we'll update rules later)
   - Select your preferred location

5. Get Firebase Configuration:
   - Go to **Project Settings** (gear icon)
   - Scroll to "Your apps"
   - Click **Web app** icon (</>)
   - Register your app
   - Copy the configuration object

6. Update Firebase Config:
   - Open `src/config/firebase.ts`
   - Replace the placeholder values with your Firebase config:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
\`\`\`

### Step 2: Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Replace with the following rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      // Users can only read their own bookings
      allow read: if request.auth != null && 
                  resource.data.userId == request.auth.uid;
      
      // Users can create bookings
      allow create: if request.auth != null &&
                    request.resource.data.userId == request.auth.uid;
      
      // Users can update their own bookings (for cancellation)
      allow update: if request.auth != null && 
                    resource.data.userId == request.auth.uid;
      
      // No deletion allowed
      allow delete: if false;
    }
    
    // Payments collection
    match /payments/{paymentId} {
      // Users can only read their own payments
      allow read: if request.auth != null && 
                  resource.data.userId == request.auth.uid;
      
      // Users can create payment records
      allow create: if request.auth != null &&
                    request.resource.data.userId == request.auth.uid;
      
      // No updates or deletes
      allow update, delete: if false;
    }
    
    // Restaurants collection (read-only for all authenticated users)
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins should write (implement admin check)
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true; // Anyone can read reviews
      allow create: if request.auth != null; // Only authenticated users can create
      allow update, delete: if request.auth != null && 
                              resource.data.userId == request.auth.uid;
    }
  }
}
\`\`\`

3. Click **Publish**

### Step 3: Firestore Indexes

Create composite indexes for efficient queries:

1. Go to **Firestore Database** → **Indexes**
2. Create the following index:

- **Collection**: `bookings`
- **Fields**:
  - `userId` (Ascending)
  - `createdAt` (Descending)

This will be auto-created when you first run a query, or you can create it manually.

### Step 4: Razorpay Setup (Optional)

#### For Real Payments:

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Generate Test API Keys
4. Copy the **Key ID**
5. Open `src/components/Payment.tsx`
6. Replace `rzp_test_YOUR_KEY_HERE` with your actual Key ID

#### For Demo/Testing:

- Use the "Demo Payment" button in the payment page
- No Razorpay setup required
- This will simulate successful payments for testing

### Step 5: Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

### Step 6: Run Development Server

\`\`\`bash
pnpm dev
\`\`\`

The application should now be running!

## 📁 Project Structure

\`\`\`
src/
├── app/
│   └── App.tsx                 # Main application component
├── components/
│   ├── BookingConfirmation.tsx # Booking confirmation page
│   ├── BookingForm.tsx         # Table booking form
│   ├── Header.tsx              # Navigation header
│   ├── Login.tsx               # Login component
│   ├── Payment.tsx             # Payment integration
│   ├── RestaurantCard.tsx      # Restaurant card component
│   ├── RestaurantDetails.tsx   # Restaurant details page
│   ├── RestaurantList.tsx      # Restaurant listing with filters
│   ├── Signup.tsx              # Signup component
│   └── UserDashboard.tsx       # User bookings dashboard
├── config/
│   └── firebase.ts             # Firebase configuration
├── context/
│   └── AuthContext.tsx         # Authentication context
├── data/
│   └── mockRestaurants.ts      # Mock restaurant data
└── types/
    └── index.ts                # TypeScript interfaces

\`\`\`

## 🗄️ Firestore Database Structure

### Collections:

#### `users`
\`\`\`typescript
{
  uid: string,
  name: string,
  email: string,
  createdAt: string
}
\`\`\`

#### `bookings`
\`\`\`typescript
{
  id: string,
  userId: string,
  restaurantId: string,
  restaurantName: string,
  date: string,
  time: string,
  guests: number,
  amount: number,
  status: 'pending' | 'confirmed' | 'cancelled',
  createdAt: string
}
\`\`\`

#### `payments`
\`\`\`typescript
{
  id: string,
  userId: string,
  bookingId: string,
  amount: number,
  paymentStatus: 'success' | 'failed' | 'pending',
  transactionId?: string,
  createdAt: string
}
\`\`\`

#### `restaurants` (Optional - for production)
\`\`\`typescript
{
  id: string,
  name: string,
  image: string,
  images: string[],
  rating: number,
  cuisine: string[],
  priceRange: string,
  location: string,
  description: string,
  availableSlots: string[]
}
\`\`\`

## 🚢 Deployment

### Deploy to Firebase Hosting:

1. Install Firebase CLI:
\`\`\`bash
npm install -g firebase-tools
\`\`\`

2. Login to Firebase:
\`\`\`bash
firebase login
\`\`\`

3. Initialize Firebase:
\`\`\`bash
firebase init
\`\`\`
- Select **Hosting**
- Choose your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: **Yes**
- Don't overwrite index.html: **No**

4. Build the project:
\`\`\`bash
pnpm build
\`\`\`

5. Deploy:
\`\`\`bash
firebase deploy
\`\`\`

### Deploy to Vercel:

1. Install Vercel CLI:
\`\`\`bash
npm install -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

3. Set environment variables in Vercel dashboard (if needed)

## 🔐 Environment Variables

For production, consider using environment variables:

Create `.env` file:
\`\`\`env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY=your_razorpay_key
\`\`\`

Update `src/config/firebase.ts`:
\`\`\`typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
\`\`\`

## 📧 Email Notifications (Optional)

To add email confirmations:

1. Install EmailJS or use Firebase Extensions
2. For EmailJS:
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create email template
   - Add to `BookingConfirmation.tsx`

3. For Firebase Extensions:
   - Install "Trigger Email" extension
   - Configure email template
   - Trigger on booking creation

## 🧪 Testing

### Test Accounts:
Create test accounts with email/password in the signup page.

### Test Bookings:
1. Login with test account
2. Browse restaurants
3. Click "Book Now"
4. Fill booking form
5. Use "Demo Payment" for testing

### Test Payment:
- Use demo mode (no Razorpay needed)
- Or use Razorpay test cards:
  - Card: 4111 1111 1111 1111
  - CVV: Any 3 digits
  - Expiry: Any future date

## ⚙️ Additional Features to Implement

- [ ] Admin panel for restaurant management
- [ ] Real-time availability checking
- [ ] Email/SMS notifications
- [ ] Review and rating system
- [ ] Favorites functionality
- [ ] Advanced search (location-based)
- [ ] Restaurant recommendations
- [ ] Booking modifications
- [ ] Payment refunds
- [ ] Multi-language support

## 🐛 Troubleshooting

### Firebase Connection Issues:
- Check if Firebase config is correct
- Ensure Firebase services are enabled
- Check browser console for errors

### Authentication Not Working:
- Verify Email/Password auth is enabled in Firebase
- Check Firestore rules
- Clear browser cache

### Payment Issues:
- Use demo mode for testing
- Check Razorpay key is correct
- Ensure script is loaded

## 📝 License

MIT License

## 🤝 Contributing

Feel free to submit issues and pull requests!

## 📞 Support

For issues and questions, please create an issue in the repository.
