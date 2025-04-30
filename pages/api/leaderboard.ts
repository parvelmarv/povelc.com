import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';


// Load MongoDB URI and API Key from environment variables
const mongoURI = process.env.MONGODB_URI;
const apiKey = process.env.API_KEY;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

if (!mongoURI || !apiKey || !dbName || !collectionName) {
  throw new Error('Missing required environment variables');
}

const maxRequests = 100;
const rateLimitWindow = 60 * 1000; // 1 minute
const maxScores = 20;
const displayScores = 10;

let client: MongoClient;

// Rate limit tracking
const rateLimit = new Map<string, number[]>();

// Connect to MongoDB
const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(mongoURI);
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
};

// Helper: Check if IP is within rate limit
const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const timestamps = rateLimit.get(ip) || [];
  const recentRequests = timestamps.filter((timestamp) => now - timestamp <= rateLimitWindow);
  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
};

// Helper: Validate score
const validateScore = (score: { playerName: string; time: number }): boolean => {
  return score.time > 0 && score.time <= 300.0; // Validate time between 0 and 300 seconds
};

// Handler: GET and POST requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // CORS handling
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://povelc.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", origin as string);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (method === "OPTIONS") {
    return res.status(200).end(); // Preflight request
  }

  // Rate limit check
  if (!checkRateLimit(req.headers['x-forwarded-for'] as string || req.connection.remoteAddress || '')) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const collection = await connectToDatabase();

  if (method === "GET") {
    // Fetch leaderboard
    try {
      const scores = await collection.find({}).sort({ time: 1 }).limit(displayScores).toArray();
      return res.status(200).json(scores);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (method === "POST") {
    // API key validation
    const requestApiKey = req.headers['x-api-key'] as string;
    if (requestApiKey !== apiKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { playerName, time } = req.body;

    if (!playerName || !time || !validateScore({ playerName, time })) {
      return res.status(400).json({ error: "Invalid score data" });
    }

    // Insert score into DB
    try {
      const count = await collection.countDocuments();
      if (count >= maxScores) {
        // If we have more than maxScores, check if new score is better than the worst
        const worstScore = await collection.find({}).sort({ time: -1 }).limit(1).next();
        if (worstScore && worstScore.time <= time) {
          return res.status(200).json({ message: "Score not in top scores" });
        }
      }

      const newScore = {
        playerName,
        time,
        createdAt: new Date(),
      };

      await collection.insertOne(newScore);

      // If we have more than maxScores, remove the worst score
      if (count + 1 > maxScores) {
        const worstScore = await collection.find({}).sort({ time: -1 }).limit(1).next();
        if (worstScore) {
          await collection.deleteOne({ _id: worstScore._id });
        }
      }

      return res.status(201).json({ message: "Score submitted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}