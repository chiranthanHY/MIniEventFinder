import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '../types';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

// In-memory event storage
const events: Event[] = [];

// Get all events (with optional location filter)
router.get('/', (req: AuthRequest, res: Response): void => {
  try {
    const { location } = req.query;

    let filteredEvents = events;

    if (location && typeof location === 'string') {
      filteredEvents = events.filter(
        (event) => event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json(filteredEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single event by ID
router.get('/:id', (req: AuthRequest, res: Response): void => {
  try {
    const { id } = req.params;

    const event = events.find((e) => e.id === id);

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new event (protected route)
router.post('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  try {
    const { title, description, location, date, maxParticipants } = req.body;

    if (!title || !description || !location || !date || !maxParticipants) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const newEvent: Event = {
      id: uuidv4(),
      title,
      description,
      location,
      date,
      maxParticipants: Number(maxParticipants),
      currentParticipants: 0,
    };

    events.push(newEvent);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
