## Portfolio Website

Personal portfolio site built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **MongoDB**, deployed on **Vercel**.  
It showcases some personas project in three main categories Music/Games/Other

### Tech stack

- **Framework**: Next.js 16 (Turbopack)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS
- **Database**: MongoDB (MongoDB Atlas recommended)
- **Deployment**: Vercel

### Running locally

```bash
npm install
npm run dev
```

The app will start on `http://localhost:3000` (or the next available port).

### Required environment variables

Create a `.env` file in the project root (this file is git-ignored) with at least:

- `MONGODB_URI` – MongoDB connection string
- `API_KEY` – shared secret used by the leaderboard API
- `DB_NAME` – MongoDB database name
- `COLLECTION_NAME` – MongoDB collection name for leaderboard entries
- `KEY_CREATION_DATE` – optional metadata used by the app


