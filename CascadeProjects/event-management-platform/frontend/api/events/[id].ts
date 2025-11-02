import { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage (same as backend)
const events: any[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const event = events.find(e => e.id === id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.status(200).json(event);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
