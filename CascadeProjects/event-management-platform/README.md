# Event Management Platform

A full-stack event management platform built with Node.js, Express, Next.js, and shadcn/ui featuring a stunning dark geometric landing page.

## 🌟 Features

- **Beautiful Landing Page**: Geometric hero section with animated shapes and smooth transitions
- **User Authentication**: JWT-based authentication with secure login/signup
- **Event Management**: Create, view, and browse events
- **Search & Filter**: Filter events by location and search by title
- **Dark Theme**: Modern dark UI with glassmorphism effects
- **Responsive Design**: Works seamlessly on all devices

## 📁 Project Structure

```
event-management-platform/
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   ├── types.ts      # TypeScript types
│   │   ├── routes/       # API routes
│   │   │   ├── auth.ts   # Authentication endpoints
│   │   │   └── events.ts # Event endpoints
│   │   └── middleware/
│   │       └── authMiddleware.ts  # JWT verification
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/             # Next.js frontend
    ├── src/
    │   ├── app/          # Next.js App Router pages
    │   │   ├── page.tsx  # Landing page
    │   │   ├── sign-in/  # Sign in page
    │   │   ├── sign-up/  # Sign up page
    │   │   └── dashboard/  # Dashboard pages
    │   ├── components/ui/  # shadcn/ui components
    │   └── lib/
    │       ├── api.ts    # API client
    │       └── utils.ts  # Utilities
    ├── package.json
    ├── tailwind.config.ts
    └── components.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## 🎯 API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

- **POST** `/api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Events

- **GET** `/api/events` - Get all events
  - Query: `?location=London` (optional)
  - Returns: Array of events

- **GET** `/api/events/:id` - Get event by ID
  - Returns: Event object

- **POST** `/api/events` - Create new event (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, description, location, date, maxParticipants }`
  - Returns: Created event

## 🎨 Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- CORS

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (animations)
- Lucide React (icons)
- Axios (API calls)

## 📝 Usage

1. **Landing Page**: Visit `http://localhost:3000` to see the beautiful geometric landing page
2. **Sign Up**: Click "Sign Up" to create a new account
3. **Sign In**: Login with your credentials
4. **Dashboard**: Browse all available events
5. **Create Event**: Click "Create Event" to add a new event
6. **View Details**: Click on any event to see full details

## 🔒 Security Notes

⚠️ **Important**: This is a development/demo project with the following security considerations:

- JWT secret is hardcoded (should use environment variables in production)
- Passwords are hashed with bcrypt
- In-memory storage (data resets on server restart)
- For production, use a real database (MongoDB, PostgreSQL, etc.)
- Implement proper error handling and validation
- Use HTTPS in production
- Add rate limiting and request validation

## 🎨 Design Features

- **Geometric Shapes**: Animated floating shapes with gradient effects
- **Glassmorphism**: Transparent cards with backdrop blur
- **Smooth Animations**: Framer Motion powered transitions
- **Gradient Text**: Beautiful gradient text effects
- **Dark Theme**: Consistent dark color scheme
- **Responsive**: Mobile-first responsive design

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 🤝 Contributing

This is a demo project, but feel free to fork and extend it for your own needs!
