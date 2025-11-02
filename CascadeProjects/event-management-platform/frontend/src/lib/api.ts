import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
}

// Auth API calls
export const authAPI = {
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Event API calls
export const eventAPI = {
  getAll: async (location?: string) => {
    const params = location ? { location } : {};
    const response = await api.get('/events', { params });
    return response.data as Event[];
  },
  getById: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data as Event;
  },
  create: async (eventData: Omit<Event, 'id' | 'currentParticipants'>) => {
    const response = await api.post('/events', eventData);
    return response.data as Event;
  },
};

export default api;
