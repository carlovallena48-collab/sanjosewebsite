import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS - ALLOW ALL FOR NOW
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE - SIMPLE TEST
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ SJMP Parish API is running!',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ✅ HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ✅ ANNOUNCEMENTS
app.get('/api/announcements', async (req, res) => {
  try {
    console.log('📢 Fetching announcements...');
    const announcements = await mongoose.connection.db.collection('websiteannouncements')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      data: announcements,
      count: announcements.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Announcements error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      data: []
    });
  }
});

// ✅ START SERVER
const startServer = async () => {
  try {
    // Connect to MongoDB first
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    
    // Then start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 URL: https://sanjosewebsite.onrender.com`);
    });
    
  } catch (error) {
    console.error('❌ Startup failed:', error);
    process.exit(1);
  }
};

startServer();