# Mayra Collection - Deployment Guide

## Prerequisites

1. **Node.js**: v18 or higher
2. **MongoDB Atlas**: Cluster setup with database credentials
3. **Razorpay Account**: Live keys for payment processing
4. **Git**: For version control

## Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Database
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/mayra_collection

# Razorpay
RAZORPAY_KEY_ID=rzp_live_[your_key_id]
RAZORPAY_KEY_SECRET=[your_key_secret]

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000  # Change for production
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access application
# Customer: http://localhost:3000
# Admin: http://localhost:3000/admin
```

## Production Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel

# Set environment variables in Vercel dashboard
# Then redeploy
```

### Option 2: Self-Hosted (Node.js)

```bash
# Build the project
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm i -g pm2
pm2 start "npm start" --name mayra-collection
```

## Database Setup

1. Create a MongoDB Atlas account
2. Create a cluster
3. Add your connection string to `.env.local`
4. Database collections will be created automatically on first request

## Razorpay Integration

1. Sign up at razorpay.com
2. Get your API keys from dashboard
3. Add keys to environment variables
4. Test with test keys before going live
5. Switch to live keys for production

## Security Checklist

- [ ] Environment variables set securely (never commit .env.local)
- [ ] Razorpay keys are live (not test keys)
- [ ] HTTPS enabled on production
- [ ] CORS properly configured
- [ ] Database backups scheduled
- [ ] Error logs monitored

## Monitoring

- Set up error tracking (Sentry recommended)
- Monitor payment transactions in Razorpay dashboard
- Track site performance and uptime
- Set up automated backups for MongoDB

## Support

For issues or questions, contact support or check documentation.
