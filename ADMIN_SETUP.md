# VIBE BITES Admin System Setup

## Overview
The VIBE BITES admin system provides comprehensive management capabilities for the e-commerce platform, including user management, product management, order management, coupon management, and analytics.

## Features

### 🔐 Authentication & Authorization
- Secure login system with JWT tokens
- Role-based access control (Admin/User)
- Protected admin routes
- Session management

### 📊 Dashboard
- Real-time statistics (users, products, orders, revenue)
- Monthly and total revenue tracking
- Recent orders overview
- Top-selling products analytics

### 👥 User Management
- View all registered users
- Search and filter users
- Activate/deactivate user accounts
- Delete user accounts
- User role management

### 📦 Product Management
- View all products with search and filtering
- Add new products
- Edit existing products
- Delete products
- Stock management
- Category organization

### 🛒 Order Management
- View all orders with search and filtering
- Update order status (pending, processing, shipped, delivered, cancelled)
- Order details and customer information
- Order tracking

### 🎫 Coupon Management
- Create and manage discount coupons
- Set discount types (percentage/fixed amount)
- Configure usage limits and minimum amounts
- Activate/deactivate coupons
- Track coupon usage

### 📈 Analytics
- Sales analytics with time period filtering
- Product performance tracking
- Revenue analysis
- Order trends

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Environment Variables
Create a `.env` file in the server directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vibe-bites
MONGODB_URI_PROD=your_production_mongodb_uri

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Server
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email (optional for email verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

#### Create Admin User
Run the following command to create an admin user:

```bash
npm run create-admin
```

This will create an admin user with:
- Email: `admin@vibebites.com`
- Password: `admin123`

#### Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:8080`

### 2. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install
```

#### Environment Variables
Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### Start the Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage Guide

### 1. Accessing the Admin Dashboard

1. Navigate to `http://localhost:3000/login`
2. Login with admin credentials:
   - Email: `admin@vibebites.com`
   - Password: `admin123`
3. You'll be automatically redirected to the admin dashboard

### 2. Dashboard Overview

The dashboard provides:
- **Statistics Cards**: Total users, products, orders, and revenue
- **Recent Orders**: Latest 5 orders with status
- **Top Products**: Best-selling products with sales data

### 3. User Management

#### Viewing Users
- Navigate to the "Users" tab
- Use search to find specific users
- Filter by status (Active/Inactive)

#### Managing Users
- **Activate/Deactivate**: Toggle user account status
- **Delete**: Remove user accounts (use with caution)
- **View Details**: See user information and order history

### 4. Product Management

#### Viewing Products
- Navigate to the "Products" tab
- Search products by name or description
- Filter by stock status

#### Managing Products
- **Add Product**: Click "Add Product" button
- **Edit Product**: Click "Edit" on any product
- **Delete Product**: Remove products from inventory
- **Stock Management**: Monitor and update stock levels

### 5. Order Management

#### Viewing Orders
- Navigate to the "Orders" tab
- Search orders by order ID or customer details
- Filter by order status

#### Managing Orders
- **Update Status**: Change order status using dropdown
- **View Details**: See order items and customer info
- **Track Orders**: Monitor order progress

### 6. Coupon Management

#### Viewing Coupons
- Navigate to the "Coupons" tab
- Filter by active/inactive status

#### Managing Coupons
- **Create Coupon**: Set discount type, value, and limits
- **Edit Coupon**: Modify existing coupon details
- **Delete Coupon**: Remove unused coupons
- **Track Usage**: Monitor coupon usage statistics

## API Endpoints

### Admin Routes (Protected)
All admin routes require authentication and admin privileges.

#### Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

#### User Management
- `GET /api/admin/users` - Get all users with pagination
- `PUT /api/admin/users/:id/status` - Update user status
- `DELETE /api/admin/users/:id` - Delete user

#### Product Management
- `GET /api/admin/products` - Get all products with pagination
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

#### Order Management
- `GET /api/admin/orders` - Get all orders with pagination
- `PUT /api/admin/orders/:id/status` - Update order status

#### Coupon Management
- `GET /api/admin/coupons` - Get all coupons with pagination
- `POST /api/admin/coupons` - Create new coupon
- `PUT /api/admin/coupons/:id` - Update coupon
- `DELETE /api/admin/coupons/:id` - Delete coupon

#### Analytics
- `GET /api/admin/analytics/sales` - Get sales analytics
- `GET /api/admin/analytics/products` - Get product analytics

## Security Features

### Authentication
- JWT-based authentication
- Token expiration handling
- Secure password hashing with bcrypt

### Authorization
- Role-based access control
- Admin-only route protection
- User status validation

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting

## Customization

### Adding New Admin Features
1. Create new routes in `server/routes/admin.js`
2. Add corresponding UI components in `client/app/admin/page.js`
3. Update navigation tabs as needed

### Styling
The admin interface uses Tailwind CSS with custom VIBE BITES theme colors:
- `vibe-bg`: Background color
- `vibe-brown`: Primary text color
- `vibe-cookie`: Accent color

### Database Schema
All models are defined in `server/models/`:
- `User.js` - User accounts and authentication
- `Product.js` - Product catalog
- `Order.js` - Order management
- `Coupon.js` - Discount coupons

## Troubleshooting

### Common Issues

1. **Admin user not created**
   - Ensure MongoDB is running
   - Check database connection in `.env`
   - Run `npm run create-admin` again

2. **Login not working**
   - Verify server is running on port 8080
   - Check JWT_SECRET in environment variables
   - Ensure admin user exists in database

3. **API calls failing**
   - Check CORS configuration
   - Verify API URL in frontend environment
   - Ensure authentication token is valid

4. **Database connection issues**
   - Verify MongoDB connection string
   - Check if MongoDB service is running
   - Ensure database exists

### Support
For additional support or feature requests, please contact the development team.

## License
This admin system is part of the VIBE BITES e-commerce platform and is proprietary software. 