import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// In-memory storage (same as backend)
const users: any[] = [];
const events: any[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

const authenticate = (req: NextApiRequest): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all events
    const { location } = req.query;
    let filteredEvents = events;

    if (location) {
      filteredEvents = events.filter(event =>
        event.location.toLowerCase().includes(location.toString().toLowerCase())
      );
    }

    return res.status(200).json(filteredEvents);
  }

  if (req.method === 'POST') {
    try {
      const user = authenticate(req);
      const { title, description, location, date, maxParticipants } = req.body;

      if (!title || !description || !location || !date || !maxParticipants) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newEvent = {
        id: Date.now().toString(),
        title,
        description,
        location,
        date,
        maxParticipants: parseInt(maxParticipants),
        currentParticipants: 0,
      };

      events.push(newEvent);
      return res.status(201).json(newEvent);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
