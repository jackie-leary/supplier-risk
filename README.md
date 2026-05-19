# Supplier Risk Assessment

An AI-powered supply chain risk assessment tool. Enter a supplier's name, country, and industry to generate a structured risk profile using live web search and Claude AI.

## Features

- AI-generated risk profiles with real-time web search
- Risk scoring across geopolitical, environmental, labor, and regulatory categories
- Assessment history with server-side pagination
- Full-stack TypeScript (React + Node/Express)
- MongoDB Atlas for persistent storage

## Tech Stack

**Frontend**

- React + TypeScript
- Vite
- CSS Modules

**Backend**

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Anthropic Claude API (with web search)

**Infrastructure**

- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas
- CI: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB Atlas account
- Anthropic API key

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
ANTHROPIC_API_KEY=your_key_here
MONGODB_URI=your_atlas_uri_here
PORT=3000
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` folder:

```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Visit `http://localhost:5173`

## Live Demo

[supplier-risk-zeta.vercel.app](https://supplier-risk-zeta.vercel.app)
