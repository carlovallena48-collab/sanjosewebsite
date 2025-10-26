import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 }) // Sort by date ascending
      .select('-__v'); // Exclude version key

    res.json({
      success: true,
      data: events,
      count: events.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: event,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get single event error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID',
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// POST create new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: savedEvent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Create event error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors,
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Return updated document
        runValidators: true // Run model validations
      }
    ).select('-__v');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Update event error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors,
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating event',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted successfully',
      data: { id: req.params.id },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Delete event error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID',
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;