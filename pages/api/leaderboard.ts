import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface LeaderboardEntry {
  _id?: ObjectId;
  playerName: string;
  time: number;
  createdAt: Date;
}

// Load MongoDB URI and API Key from environment variables
const mongoURI = process.env.MONGODB_URI;
const apiKey = process.env.API_KEY;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

console.error("This should show up in stderr");


if (!mongoURI || !apiKey || !dbName || !collectionName) {
  throw new Error('Missing required environment variables');
}

const maxRequests = 100;
const rateLimitWindow = 60 * 1000; // 1 minute
const maxScores = 20;
const displayScores = 10;

// Rate limit tracking
const rateLimit = new Map<string, number[]>();

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

  // Request size limiting
  const contentLength = req.headers['content-length'];
  const MAX_BODY_SIZE = 256; // 256 bytes limit - enough for playerName and time
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return res.status(413).json({ error: "Request body too large" });
  }

  console.log(`Received ${req.method} request to /api/leaderboard`);

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
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  }

  if (method === "OPTIONS") {
    return res.status(200).end(); // Preflight request
  }

  // Rate limit check
  if (!checkRateLimit(req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '')) {
    return res.status(429).json({ error: "Too many requests" });
  }
  console.log("Connecting to MongoDB...");
  const client = await clientPromise;
  const db = client.db(dbName as string);
  const collection = db.collection(collectionName as string);

  if (method === "GET") {
    console.log("Fetching leaderboard...");
    try {
      const scores = await collection.find<LeaderboardEntry>({})
        .sort({ time: 1 })
        .limit(displayScores)
        .toArray();
      
      // Format response to match Unity's expectations
      const formattedScores = scores.map(score => ({
        playerName: score.playerName,
        time: score.time,
        createdAt: score.createdAt.toISOString()
      }));
      
      return res.status(200).json(formattedScores);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (method === "POST") {
    console.log("Submitting score...");
    console.log("Raw request body:", req.body);
    console.log("Request headers:", req.headers);
    
    let body;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        console.log("Parsed body:", body);
        console.log("Body type:", typeof body);
        console.log("Body keys:", Object.keys(body));
    } catch (e) {
        console.error("Error parsing body:", e);
        return res.status(400).json({ error: "Invalid JSON" });
    }

    const { playerName, time } = body;
    console.log("Extracted playerName:", playerName);
    console.log("Extracted time:", time);
    console.log("Time type:", typeof time);
    // API key validation
    const requestApiKey = req.headers['x-api-key'] as string;
    if (requestApiKey !== apiKey) {
        console.log("Received API Key:", requestApiKey);
        console.log("Expected API Key:", apiKey);
        console.log("Headers:", req.headers);
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Input sanitization
    const sanitizedPlayerName = (playerName || '').toString().trim().slice(0, 50);
    const sanitizedTime = Number(time);

    if (!sanitizedPlayerName || isNaN(sanitizedTime) || !validateScore({ playerName: sanitizedPlayerName, time: sanitizedTime })) {
      console.log("Validation failed:", {
        hasPlayerName: !!sanitizedPlayerName,
        isTimeValid: !isNaN(sanitizedTime),
        timeValue: sanitizedTime,
        validationResult: validateScore({ playerName: sanitizedPlayerName, time: sanitizedTime })
      });
      return res.status(400).json({ error: "Invalid score data" });
    }

    // Insert score into DB
    try {
      const count = await collection.countDocuments();
      if (count >= maxScores) {
        const worstScore = await collection.find<LeaderboardEntry>({})
          .sort({ time: -1 })
          .limit(1)
          .next();
        if (worstScore && worstScore.time <= sanitizedTime) {
          return res.status(200).json({ message: "Score not in top scores" });
        }
      }

      const newScore: LeaderboardEntry = {
        playerName: sanitizedPlayerName,
        time: sanitizedTime,
        createdAt: new Date(),
      };

      await collection.insertOne(newScore);

      // If we have more than maxScores, remove the worst score
      if (count + 1 > maxScores) {
        const worstScore = await collection.find<LeaderboardEntry>({})
          .sort({ time: -1 })
          .limit(1)
          .next();
        if (worstScore) {
          await collection.deleteOne({ _id: worstScore._id });
        }
      }

      return res.status(201).json({ 
        message: "Score submitted successfully",
        score: {
          playerName: sanitizedPlayerName,
          time: sanitizedTime,
          createdAt: newScore.createdAt.toISOString()
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}