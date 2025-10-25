import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS FOR VERCEl FRONTEND
app.use(cors({
  origin: [
    'https://your-website.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'  // Vite dev server
  ],
  credentials: true
}));

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Connected');
})
.catch(err => {
  console.error('❌ MongoDB Error:', err);
});

// ✅ ROOT ROUTE - FIX "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ 
    message: 'San Jose Manggagawa Parish API',
    status: 'Running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: [
      '/api/announcements',
      '/health'
    ]
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

// ✅ MAIN ANNOUNCEMENTS ROUTE
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await mongoose.connection.db.collection('websiteannouncements')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      data: announcements,
      count: announcements.length
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      data: []
    });
  }
});

app.listen(PORT, () => {
  console.log(`📍 Server: http://localhost:${PORT}`);
});