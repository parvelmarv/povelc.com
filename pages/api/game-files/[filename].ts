import type { NextApiRequest, NextApiResponse } from 'next';
import { downloadGameFile } from '@/lib/gameStorage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, gameName } = req.query;
    
    if (!filename || typeof filename !== 'string') {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Extract game name from query or use default
    const r2GameName = (typeof gameName === 'string' ? gameName : null) || 'RolloRocket';
    
    console.log('Fetching game file:', { filename, r2GameName });
    
    const fileData = await downloadGameFile(r2GameName, filename);
    
    // Set appropriate content type
    if (filename.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filename.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    } else if (filename.includes('.data')) {
      res.setHeader('Content-Type', 'application/octet-stream');
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    return res.send(Buffer.from(fileData));
    
  } catch (error: any) {
    console.error('Error serving game file:', error);
    const errorMessage = error?.message || 'Unknown error';
    console.error('Error details:', {
      filename: req.query.filename,
      gameName: req.query.gameName,
      error: errorMessage,
      stack: error?.stack
    });
    return res.status(500).json({ 
      error: 'Failed to load game file',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
}
