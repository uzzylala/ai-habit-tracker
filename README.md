# AI Habit Tracker

A full-stack MERN habit-tracking web application powered by Google Gemini free AI Model. Track daily and weekly habits with drag-and-drop prioritization, visualize consistency through 90-day heatmaps and interactive charts, and get personalized AI coaching, streak recovery plans, and habit recommendations.

## Project Highlights

- **Full-Stack Architecture:** Architected and built an end-to-end MERN habit-tracking platform (**React 19, Vite, Tailwind CSS v4, Node.js, Express, MongoDB**) supporting full CRUD workflows, habit archiving, and drag-and-drop prioritization (`@dnd-kit`).
- **Context-Aware AI Coaching:** Integrated the **Google Gemini API (`@google/genai`)** with structured prompt engineering and JSON schema parsing to deliver 5 personalized AI features—weekly progress reports, habit recommendations, 3-day streak recovery plans, morning motivation, and natural-language Q&A grounded in 30-day user logs.
- **Data Visualization & Streak Engine:** Engineered custom date-aggregation utilities (`date-fns`) and MongoDB compound-indexed log schemas to compute real-time current/longest streaks, 90-day activity heatmaps, and interactive **Recharts** analytics.
- **Secure Authentication & API Design:** Implemented stateless **JWT authentication**, password hashing (`bcryptjs`), protected client/server routes, and centralized Express error handling across 20+ RESTful endpoints.

## Features

- **Authentication & Profiles:** JWT-based registration, login, protected routes, and profile customization (including daily morning motivation toggles).
- **Interactive Habit Management:** Create, edit, archive, delete, and drag-and-drop reorder habits across 9 categories (`Health`, `Fitness`, `Learning`, `Mindfulness`, `Productivity`, `Social`, `Finance`, `Creative`, `Other`), complete with celebratory confetti on task completion.
- **Analytics & Streak Tracking:**
  - Automatic current and longest streak calculations.
  - 90-day activity contribution heatmap.
  - 30-day per-habit completion stats and interactive Recharts visualizations.
- **Google Gemini AI Coach:**
  - **Weekly Report:** Personalized 7-day progress summary analyzing wins, struggles, and consistency patterns.
  - **Smart Habit Suggestions:** Generates 3 tailored habit recommendations based on user goals, peak productive hours, and past struggles.
  - **3-Day Streak Recovery Plan:** Actionable, step-by-step recovery guidance when a streak is broken.
  - **AI Habit Chat:** Natural-language Q&A grounded in your last 30 days of habit logs.
  - **Morning Motivation:** Short daily boost referencing active habits and current streaks.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router v6, `@dnd-kit` (drag-and-drop), Recharts, `canvas-confetti`, `react-markdown`, Lucide Icons
- **Backend:** Node.js, Express.js (ES Modules)
- **Database:** MongoDB & Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & `bcryptjs`
- **AI Integration:** `@google/genai` (Google Gemini API)

## Project Structure

```text
ai-habit-tracker/
├── backend/
│   ├── config/          # MongoDB connection setup
│   ├── controllers/     # Auth, Habit, Log, and AI route handlers
│   ├── middleware/      # JWT protection & error handling
│   ├── models/          # User, Habit, HabitLog, and AIInsight schemas
│   ├── routes/          # Express API routers (/api/auth, /api/habits, /api/logs, /api/ai)
│   ├── scripts/         # Database seed script
│   ├── utils/           # Gemini AI service & date/streak helpers
│   └── server.js        # Express entry point
├── frontend/
│   ├── public/          # Static public assets
│   ├── src/
│   │   ├── api/         # Axios instance & API service configuration
│   │   ├── assets/      # Images, icons, and static media
│   │   ├── components/  # Reusable UI widgets, grids, charts, and modals
│   │   ├── context/     # Auth and Theme React context providers
│   │   ├── pages/       # Route views (Dashboard, Weekly, Insights, AI Coach, Auth)
│   │   ├── utils/       # Client-side date and streak formatting helpers
│   │   ├── App.jsx      # Main router and protected route layout
│   │   ├── index.css    # Tailwind CSS v4 styles and theme variables
│   │   └── main.jsx     # React DOM root entry point
│   ├── index.html       # HTML entry template
│   ├── package.json     # Frontend dependencies and scripts
│   ├── vercel.json      # SPA routing rewrite rules for Vercel
│   └── vite.config.js   # Vite bundler and Tailwind plugin configuration
└── README.md

```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas cluster or local MongoDB instance
- Google AI Studio API Key ([Get a free key](https://aistudio.google.com))

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash-lite
```

Start the backend server:

```bash
npm run dev
```

*(Optional)* Populate demo data:

```bash
npm run seed
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` (if not using Vite proxy):

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend development server:

```bash
npm run dev
```

## API Endpoints Overview

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Server health check | No |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in and receive JWT | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes |
| `PUT` | `/api/auth/profile` | Update profile details | Yes |
| `GET` | `/api/habits` | List active or archived habits | Yes |
| `POST` | `/api/habits` | Create a new habit | Yes |
| `PUT` | `/api/habits/:id` | Update a habit | Yes |
| `PUT` | `/api/habits/:id/archive` | Toggle archive status | Yes |
| `PUT` | `/api/habits/reorder` | Save drag-and-drop habit order | Yes |
| `DELETE` | `/api/habits/:id` | Delete a habit and its logs | Yes |
| `POST` | `/api/logs` | Mark a habit complete | Yes |
| `DELETE` | `/api/logs` | Unmark a habit completion | Yes |
| `GET` | `/api/logs/today` | Get today's completed logs | Yes |
| `GET` | `/api/logs/heatmap` | Get 90-day completion counts | Yes |
| `GET` | `/api/logs/stats` | Get 30-day stats and streaks | Yes |
| `POST` | `/api/ai/weekly-report` | Generate a 7-day AI coaching report | Yes |
| `POST` | `/api/ai/suggest-habits` | Get 3 AI-suggested habits | Yes |
| `POST` | `/api/ai/recovery-plan` | Generate a 3-day streak recovery plan | Yes |
| `POST` | `/api/ai/chat` | Ask AI questions about habit data | Yes |
| `GET` | `/api/ai/morning` | Get personalized morning motivation | Yes |

## License

MIT
