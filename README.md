# Mayra Collection - E-Commerce Store

A fully functional, mobile-first e-commerce platform built with Next.js, MongoDB, and Razorpay payment integration.

## Features

- **Product Management**: Browse, search, and filter products by category
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **Secure Payments**: Razorpay integration with payment signature verification
- **Order Management**: Complete order tracking with payment confirmation
- **Admin Dashboard**: Manage products, orders, inventory, and payment-confirmed orders
- **Mobile-First Design**: App-like experience with bottom navigation on mobile
- **Responsive Layout**: Seamless experience on all devices
- **Database**: MongoDB for reliable data persistence

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Payments**: Razorpay
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Razorpay account (test or live keys)

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster0.hnr8nsa.mongodb.net/mayra_collection

   # Razorpay Configuration (Use your live or test keys)
   RAZORPAY_KEY_ID=rzp_live_YourKeyIdHere
   RAZORPAY_KEY_SECRET=YourKeySecretHere

   # API URL
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Initialize Database** (First time only)
   
   Run the database initialization script to create collections and indexes:
   ```bash
   node scripts/init-db.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mayra-collection/
├── app/
│   ├── api/                    # API routes
│   │   ├── products/          # Product endpoints
│   │   ├── orders/            # Order endpoints
│   │   └── admin/             # Admin endpoints
│   ├── admin/                 # Admin dashboard
│   ├── shop/                  # Product listing page
│   ├── product/               # Product detail page
│   ├── cart/                  # Shopping cart page
│   ├── checkout/              # Checkout page
│   ├── order-success/         # Order confirmation page
│   ├── account/               # User account page
│   └── layout.js              # Root layout
├── components/
│   ├── bottom-nav.js          # Mobile bottom navigation
│   └── product-card.js        # Product card component
├── hooks/
│   └── use-cart.js            # Cart management hook
├── lib/
│   ├── mongodb.js             # MongoDB connection
│   └── razorpay.js            # Razorpay utilities
├── scripts/
│   └── init-db.js             # Database initialization
└── public/                     # Static files
```

## Usage

### For Customers

1. **Browse Products**: Visit `/shop` to browse all products by category
2. **View Details**: Click on a product to see full details, sizes, and colors
3. **Add to Cart**: Select size, color, and quantity, then add to cart
4. **Checkout**: Review cart and proceed to checkout
5. **Payment**: Complete payment using Razorpay secure gateway
6. **Order Confirmation**: Receive order confirmation with order ID

### For Admins

1. **Access Dashboard**: Visit `/admin` to access the admin panel
2. **Manage Products**: 
   - View all products
   - Add new products with images, sizes, colors
   - Edit existing products
   - Delete products
3. **Manage Orders**:
   - View all payment-confirmed orders
   - Update order status (confirmed, shipped, delivered, cancelled)
   - View customer details and order items
   - Track Razorpay payment IDs

## Environment Variables

Create a `.env.local` file with the following variables:

```
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.hnr8nsa.mongodb.net/database_name

# Razorpay API Keys
# Get from: https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# API Base URL (for development)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Payment Integration

### Razorpay Setup

1. **Create Account**: Sign up at [https://razorpay.com](https://razorpay.com)
2. **Get API Keys**:
   - Go to Dashboard → Settings → API Keys
   - Copy Key ID and Key Secret
   - Use test keys for development, live keys for production
3. **Update .env.local** with your keys

### Payment Flow

1. Customer adds items to cart and proceeds to checkout
2. Customer enters shipping details
3. Order is created in MongoDB with pending status
4. Razorpay order is created server-side with encrypted amount
5. Razorpay payment modal opens
6. After successful payment, signature is verified server-side
7. Order status is updated to "confirmed" with payment details
8. Customer sees order confirmation page

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination and filtering)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)

### Orders
- `POST /api/orders/create` - Create order for payment
- `POST /api/orders/verify` - Verify Razorpay payment signature
- `GET /api/orders/[id]` - Get order details

### Admin
- `GET /api/admin/orders` - Get all confirmed orders
- `GET /api/admin/orders/[id]` - Get order details
- `PATCH /api/admin/orders/[id]` - Update order status
- `GET /api/admin/products` - Get all products
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products` - Delete product

## Security Features

- **Payment Verification**: Server-side Razorpay signature verification prevents tampering
- **Database Validation**: MongoDB schema validation ensures data integrity
- **Secure Order Storage**: Payment IDs and signatures stored for audit trail
- **Environment Variables**: Sensitive keys stored securely in environment

## Development

### Running Tests

For database initialization:
```bash
node scripts/init-db.js
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_API_URL` (set to your production domain)
4. Deploy

### Important Production Notes

1. Use Razorpay live keys in production
2. Set `NEXT_PUBLIC_API_URL` to your production domain
3. Ensure MongoDB connection is stable
4. Enable Razorpay webhook verification for additional security

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

### Razorpay Payment Issues
- Verify API keys are correct (test vs live)
- Check Razorpay account status
- Ensure payment amounts are in paise (multiply by 100)

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and try again
- Ensure cookies/storage permissions are allowed

## License

This project is created with v0 by Vercel.

## Support

For issues and support, please contact Mayra Collection support team.
