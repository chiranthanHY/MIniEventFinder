export interface User {
  id: string;
  email: string;
  password: string;
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
