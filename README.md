# Shortify: Modern URL Shortener & Analytics Platform

Shortify is a high-performance, full-stack URL shortening service designed with a focus on speed, scalability, and deep analytics. Built using the MERN stack and optimized with Redis caching, it provides users with instant redirections and real-time insights into their link performance.

## 🚀 Key Features

- **Blazing Fast Redirection:** Leverages Redis caching to provide sub-millisecond lookups for frequent links.
- **Deep Analytics:** Track clicks, referrers, and device types with beautiful visualizations.
- **Async Tracking:** Analytics are processed out-of-band to ensure redirection speed is never compromised.
- **Secure Authentication:** JWT-based authentication with secure, HTTP-only cookie storage.
- **Rate Limiting:** Protects the API from abuse using custom middleware.
- **Modern UI:** Responsive dashboard built with React 19, Tailwind CSS 4, and Framer Motion.

## 🏗️ Architecture

The application is split into a decoupled frontend and backend, ensuring clear separation of concerns.

### Tech Stack
- **Frontend:** React 19, React Router 7, Tailwind CSS 4, Recharts, Framer Motion, Axios.
- **Backend:** Node.js, Express 5, MongoDB (Mongoose), Redis (ioredis).
- **Caching:** Redis is used as a primary lookup layer for redirections.
- **Security:** bcryptjs for password hashing, JWT for sessions, CORS for cross-origin protection.

### Directory Structure
```text
├── backend/
│   ├── src/
│   │   ├── config/       # Database & Redis configurations
│   │   ├── controllers/  # Request handling logic
│   │   ├── middlewares/  # Auth & Rate limiting
│   │   ├── models/       # Mongoose Schemas
│   │   ├── routes/       # API Endpoint definitions
│   │   ├── services/     # Business logic (e.g., analytics processing)
│   │   └── utils/        # Helper functions
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks (useApi)
│   │   ├── layout/       # Page layouts
│   │   ├── pages/        # Application views (Dashboard, Analytics, etc.)
│   │   └── App.jsx       # Routing & Context Providers
```

## ⚙️ How It Works

### 1. URL Shortening
When a user submits a long URL, the backend generates a unique 6-character alphanumeric code. This mapping is stored in MongoDB.

### 2. High-Performance Redirection
- **Step 1 (Cache):** The server first checks Redis for the short code. If found, it redirects immediately.
- **Step 2 (Database):** If the code is not in the cache, the server fetches it from MongoDB, updates the Redis cache (with a 1-hour TTL), and then redirects.
- **Step 3 (Analytics):** Redirection happens instantly while analytics are recorded asynchronously using `setImmediate` to avoid blocking the user.

### 3. Analytics Processing
The system records every click along with:
- **Referrer:** Where the traffic is coming from.
- **User Agent:** Browser and OS details.
- **Timestamp:** For time-series analysis.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Redis (Local or Cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd URLShortener
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file based on the environment variables needed (PORT, MONGO_URI, REDIS_URL, JWT_SECRET)
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file (VITE_API_URL)
   npm run dev
   ```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive a secure cookie.
- `GET /api/auth/me` - Get current user profile.

### URLs
- `POST /api/urls` - Create a short URL (Protected).
- `GET /api/urls` - Get all URLs for the current user (Protected).
- `DELETE /api/urls/:id` - Delete a URL and its analytics (Protected).

### Analytics
- `GET /api/analytics/:code` - Get detailed statistics for a specific short code (Protected).

### Redirection
- `GET /:code` - Public redirection endpoint.

---
Built with ❤️ by the Shortify Team.
