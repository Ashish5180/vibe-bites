const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test database connection
    const conn = await mongoose.connect(
      process.env.NODE_ENV === 'production' 
        ? process.env.MONGODB_URI_PROD 
        : process.env.MONGODB_URI || 'mongodb://localhost:27017/vibe-bites',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log('✅ Database connected successfully!');
    console.log(`Database: ${conn.connection.host}`);
    
    // Test if admin user exists
    const User = require('./models/User');
    const adminUser = await User.findOne({ email: 'admin@vibebites.com' });
    
    if (adminUser) {
      console.log('✅ Admin user exists');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Role: ${adminUser.role}`);
    } else {
      console.log('❌ Admin user not found');
      console.log('Run: npm run create-admin');
    }
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\nTroubleshooting steps:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your .env file has correct MONGODB_URI');
    console.log('3. Ensure the database exists');
  }
};

testConnection(); 