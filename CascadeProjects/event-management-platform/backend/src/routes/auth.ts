import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';
import { generateToken } from '../middleware/authMiddleware';

const router = Router();

// In-memory user storage
const users: User[] = [];

// Register endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    // Generate token
    const token = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
