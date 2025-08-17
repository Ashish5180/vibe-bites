# VIBE BITES Backend API

A complete Node.js/Express.js backend API for the VIBE BITES e-commerce platform, built with MongoDB, JWT authentication, and comprehensive e-commerce features.

## 🚀 Features

### ✅ Core E-commerce Functionality
- **User Authentication & Authorization** - JWT-based auth with role-based access
- **Product Management** - CRUD operations with variants, stock management
- **Shopping Cart** - Persistent cart with real-time updates
- **Order Processing** - Complete order lifecycle management
- **Payment Integration** - Stripe payment processing
- **Coupon System** - Flexible discount management
- **Review System** - Product reviews and ratings
- **Email Notifications** - Transactional emails for orders and users

### ✅ Security & Performance
- **Input Validation** - Express-validator for all endpoints
- **Rate Limiting** - API rate limiting for security
- **Error Handling** - Comprehensive error handling and logging
- **CORS Configuration** - Proper CORS setup for frontend integration
- **Helmet.js** - Security headers and protection
- **Compression** - Response compression for performance

### ✅ Database & Models
- **MongoDB Integration** - Mongoose ODM with optimized schemas
- **User Management** - Complete user profiles with addresses
- **Product Variants** - Multiple sizes with dynamic pricing
- **Order Tracking** - Complete order status management
- **Coupon System** - Flexible discount rules and validation

## 🛠 Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Payment**: Stripe integration
- **Email**: Nodemailer with HTML templates
- **Validation**: Express-validator
- **Logging**: Winston logger
- **Security**: Helmet.js, CORS, Rate limiting

## 📁 Project Structure

```
server/
├── models/                 # Database models
│   ├── User.js           # User authentication & profiles
│   ├── Product.js        # Product management
│   ├── Order.js          # Order processing
│   └── Coupon.js         # Discount management
├── routes/               # API routes
│   ├── auth.js          # Authentication endpoints
│   ├── products.js      # Product management
│   ├── cart.js          # Shopping cart
│   ├── orders.js        # Order processing
│   ├── coupons.js       # Coupon management
│   ├── payments.js      # Stripe payment integration
│   ├── reviews.js       # Product reviews
│   └── contact.js       # Contact & support
├── middleware/           # Custom middleware
│   ├── auth.js          # JWT authentication
│   └── errorHandler.js  # Error handling
├── utils/               # Utility functions
│   ├── logger.js        # Winston logging
│   └── email.js         # Email templates & sending
├── server.js            # Main application file
├── package.json         # Dependencies & scripts
└── env.example          # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   - API Base URL: `http://localhost:8080`
   - Health Check: `http://localhost:8080/health`

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vibe-bites
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/vibe-bites

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user account
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210"
}
```

#### `POST /api/auth/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### `GET /api/auth/profile`
Get user profile (requires authentication)

#### `PUT /api/auth/profile`
Update user profile (requires authentication)

### Product Endpoints

#### `GET /api/products`
Get all products with filtering and pagination
```
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 12)
- category: Filter by category
- search: Search products
- minPrice/maxPrice: Price range filter
- sort: Sort field (name, price, rating, createdAt)
- order: Sort order (asc, desc)
```

#### `GET /api/products/:id`
Get single product by ID

#### `GET /api/products/featured`
Get featured products

#### `GET /api/products/categories`
Get all categories with product counts

### Cart Endpoints

#### `GET /api/cart`
Get user's cart (requires authentication)

#### `POST /api/cart/add`
Add item to cart
```json
{
  "productId": "product_id",
  "size": "100g",
  "quantity": 2
}
```

#### `PUT /api/cart/update`
Update cart item quantity

#### `DELETE /api/cart/remove`
Remove item from cart

#### `DELETE /api/cart/clear`
Clear user's cart

### Order Endpoints

#### `POST /api/orders`
Create a new order
```json
{
  "items": [
    {
      "productId": "product_id",
      "size": "100g",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "phone": "9876543210"
  },
  "paymentMethod": "card"
}
```

#### `GET /api/orders`
Get user's orders (requires authentication)

#### `GET /api/orders/:id`
Get order details (requires authentication)

### Coupon Endpoints

#### `GET /api/coupons`
Get all active coupons

#### `POST /api/coupons/validate`
Validate a coupon code
```json
{
  "code": "VIBE10",
  "orderAmount": 500
}
```

### Payment Endpoints

#### `POST /api/payments/create-intent`
Create Stripe payment intent
```json
{
  "amount": 500,
  "currency": "inr"
}
```

#### `POST /api/payments/confirm`
Confirm payment

### Review Endpoints

#### `GET /api/reviews/product/:productId`
Get reviews for a product

#### `POST /api/reviews`
Add a product review
```json
{
  "productId": "product_id",
  "rating": 5,
  "title": "Great product!",
  "comment": "Really enjoyed this snack."
}
```

### Contact Endpoints

#### `POST /api/contact`
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "I have a question about your products."
}
```

#### `GET /api/contact/faq`
Get FAQ data

#### `GET /api/contact/support`
Get support information

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **Input Validation** - Comprehensive validation for all inputs
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Protection** - Proper CORS configuration
- **Helmet.js** - Security headers and protection
- **Error Handling** - Secure error responses

## 📧 Email Templates

The API includes beautiful HTML email templates for:
- Email verification
- Password reset
- Order confirmation
- Order shipped notification
- Contact form submissions

## 🗄️ Database Models

### User Model
- Email, password, name, phone
- Multiple addresses (shipping/billing)
- Email verification and password reset
- Role-based access (user/admin)

### Product Model
- Name, description, category
- Multiple sizes with pricing
- Stock management
- Nutrition information
- Dietary information (gluten-free, vegan, etc.)

### Order Model
- User reference and order number
- Order items with product details
- Shipping address
- Payment and order status
- Coupon application

### Coupon Model
- Code, description, discount
- Type (percentage/fixed)
- Category-specific discounts
- Usage limits and validity periods

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set strong JWT secret
4. Configure email and payment credentials
5. Set up proper CORS origins

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/vibe-bites
JWT_SECRET=your-very-strong-secret-key
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
EMAIL_USER=your-production-email@gmail.com
CORS_ORIGIN=https://yourdomain.com
```

## 📊 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run seed` - Seed database with sample data

## 📞 Support

For questions or support, please contact:
- Email: hello@vibebites.com
- Phone: +91 98765 43210

---

**VIBE BITES Backend API** - Powering the future of healthy snacking! 🍪✨ 