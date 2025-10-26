import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '✅ SJMP API IS WORKING!',
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'HEALTHY',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/announcements', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: [],
        message: 'MongoDB not connected - using mock data',
        timestamp: new Date().toISOString()
      });
    }

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
    res.json({
      success: true,
      data: [],
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ✅ SIMPLE EVENTS ROUTE - NO DATE FORMATTING
app.get('/api/events', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: [],
        message: 'MongoDB not connected - using mock data',
        timestamp: new Date().toISOString()
      });
    }

    const events = await mongoose.connection.db.collection('websiteevents')
      .find({})
      .sort({ date: 1 })
      .toArray();
    
    // Simple mapping - NO DATE FORMATTING
    const formattedEvents = events.map(event => ({
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date, // ✅ KEEP AS IS
      time: event.time,
      location: event.location,
      category: event.category,
      contactPerson: event.contactPerson,
      isFeatured: event.isFeatured || false,
      image: event.image || null,
      status: event.status || 'scheduled',
      attendees: event.attendees || 0,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }));
    
    res.json({
      success: true,
      data: formattedEvents,
      count: events.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Events API Error:', error);
    res.status(500).json({
      success: false,
      data: [],
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ✅ SIMPLE SINGLE EVENT ROUTE
app.get('/api/events/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not available',
        timestamp: new Date().toISOString()
      });
    }

    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID',
        timestamp: new Date().toISOString()
      });
    }

    const event = await mongoose.connection.db.collection('websiteevents')
      .findOne({ _id: new mongoose.Types.ObjectId(id) });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        timestamp: new Date().toISOString()
      });
    }

    const formattedEvent = {
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date, // ✅ KEEP AS IS
      time: event.time,
      location: event.location,
      category: event.category,
      contactPerson: event.contactPerson,
      isFeatured: event.isFeatured || false,
      image: event.image || null,
      status: event.status || 'scheduled',
      attendees: event.attendees || 0,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    };
    
    res.json({
      success: true,
      data: formattedEvent,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Single Event API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.log('⚠️ MongoDB connection failed, running without database');
  }
};

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Events API available at: http://localhost:${PORT}/api/events`);
  await connectDB();
});