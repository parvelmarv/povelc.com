import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri!);

type ResponseData = {
  success: boolean;
  token?: string;
  expiresAt?: Date;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await client.connect();
    const db = client.db('leaderboard');
    const sessions = db.collection('sessions');

    // Generate a new session token
    const sessionToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Store the session in the database
    await sessions.insertOne({
      token: sessionToken,
      createdAt: new Date(),
      expiresAt: expiresAt,
      isValid: true
    });

    return res.status(200).json({ 
      success: true, 
      token: sessionToken,
      expiresAt: expiresAt
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Authentication failed' 
    });
  } finally {
    await client.close();
  }
} 