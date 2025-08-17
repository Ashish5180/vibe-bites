# Troubleshooting Guide

## "Failed to fetch" Error

This error occurs when the frontend can't connect to the backend API. Here's how to fix it:

### 1. Check if Server is Running

First, make sure your backend server is running:

```bash
cd server
npm run dev
```

You should see output like:
```
Server running on port 8080 in development mode
MongoDB Connected: localhost
```

### 2. Test Database Connection

Run the connection test:

```bash
cd server
npm run test-connection
```

This will check:
- Database connectivity
- Admin user existence
- Environment variables

### 3. Check Environment Variables

Make sure you have a `.env` file in the server directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vibe-bites

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 4. Create Admin User

If the admin user doesn't exist:

```bash
cd server
npm run create-admin
```

### 5. Check Frontend Environment

Make sure you have a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 6. Test API Endpoints

You can test the API directly using curl or Postman:

```bash
# Test health endpoint
curl http://localhost:8080/health

# Test login endpoint
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vibebites.com","password":"admin123"}'
```

### 7. Common Issues and Solutions

#### Issue: "MongoDB connection failed"
**Solution:**
- Make sure MongoDB is installed and running
- Check if MongoDB service is started: `sudo systemctl start mongod`
- Verify connection string in `.env`

#### Issue: "Port 8080 already in use"
**Solution:**
- Kill the process using port 8080: `lsof -ti:8080 | xargs kill -9`
- Or change the port in `.env`: `PORT=5001`

#### Issue: "CORS error"
**Solution:**
- Check CORS_ORIGIN in server `.env`
- Make sure it matches your frontend URL

#### Issue: "JWT_SECRET not defined"
**Solution:**
- Add JWT_SECRET to your server `.env` file
- Generate a secure secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### 8. Step-by-Step Setup

1. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create .env file with the variables above
   npm run create-admin
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   # Create .env.local file with NEXT_PUBLIC_API_URL
   npm run dev
   ```

4. **Test Login:**
   - Go to `http://localhost:3000/login`
   - Login with: `admin@vibebites.com` / `admin123`

### 9. Debug Mode

To see detailed error messages, add this to your server `.env`:

```env
DEBUG=*
```

### 10. Network Issues

If you're still having issues:

1. **Check if ports are accessible:**
   ```bash
   # Check if port 8080 is listening
   netstat -tulpn | grep :8080
   
   # Check if port 3000 is listening
   netstat -tulpn | grep :3000
   ```

2. **Test localhost connectivity:**
   ```bash
   curl http://localhost:8080/health
   ```

3. **Check firewall settings:**
   ```bash
   # Allow ports through firewall
   sudo ufw allow 3000
   sudo ufw allow 8080
   ```

### 11. Browser Console Debugging

Open browser developer tools and check:

1. **Network tab** - Look for failed requests
2. **Console tab** - Check for JavaScript errors
3. **Application tab** - Verify localStorage has the token

### 12. Alternative Testing

If the web interface isn't working, test the API directly:

```bash
# Test the login endpoint
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vibebites.com",
    "password": "admin123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

If you're still having issues, please check:
1. All console errors
2. Network tab in browser dev tools
3. Server logs for any error messages
4. Database connection status 