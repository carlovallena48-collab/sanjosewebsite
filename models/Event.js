// models/Event.js - baguhin mo to
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  category: {
    type: String,
    enum: ['Mass', 'Community', 'Ministry', 'Sacrament', 'Special', 'Other'],
    default: 'Other'
  },
  contactPerson: {
    type: String,
    trim: true,
    maxlength: [50, 'Contact person cannot exceed 50 characters']
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled'
  },
  attendees: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'websiteevents' // DITO MO ILALAGAY PARA GAMITIN NIYA YUNG EXISTING COLLECTION MO
});

export default mongoose.model('Event', eventSchema);