import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🚀 Starting Server...');

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Connected');
  console.log('📊 Database: sjmp');
})
.catch(err => {
  console.error('❌ MongoDB Error:', err);
});



// ✅ MAIN ANNOUNCEMENTS ROUTE - DIRECT TO WEBSITEANNOUNCEMENTS
app.get('/api/announcements', async (req, res) => {
  try {
    console.log('📥 Fetching announcements from websiteannouncements...');
    
    const announcements = await mongoose.connection.db.collection('websiteannouncements')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    console.log(`✅ Found ${announcements.length} announcements`);
    
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
  console.log(`📍 Announcements: http://localhost:${PORT}/api/announcements`);
});