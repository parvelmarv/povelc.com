import type { NextApiRequest, NextApiResponse } from 'next';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName } from '@/lib/r2Config';

// Configure API route timeout (Vercel Pro: 60s, Hobby: 10s)
export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
  maxDuration: 60, // Maximum duration in seconds (Vercel Pro plan)
};

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
    
    console.log('[API] Fetching game file:', { filename, r2GameName });
    
    // Check if R2 environment variables are set
    const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
    const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
    
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      const missing = [];
      if (!R2_ACCOUNT_ID) missing.push('CLOUDFLARE_ACCOUNT_ID');
      if (!R2_ACCESS_KEY_ID) missing.push('R2_ACCESS_KEY_ID');
      if (!R2_SECRET_ACCESS_KEY) missing.push('R2_SECRET_ACCESS_KEY');
      if (!R2_BUCKET_NAME) missing.push('R2_BUCKET_NAME');
      console.error('[API] Missing R2 environment variables:', missing);
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: `Missing R2 environment variables: ${missing.join(', ')}`
      });
    }
    
    const key = `Build/${filename}`;
    const r2Client = getR2Client();
    const bucketName = getR2BucketName();
    
    console.log(`[API] R2 Request: Bucket="${bucketName}", Key="${key}"`);
    
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    const response = await r2Client.send(command);
    
    if (!response.Body) {
      throw new Error('No response body received from R2');
    }
    
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
    
    // Set CORS and caching headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    // Stream the response instead of loading everything into memory
    // This is more efficient for large files and reduces timeout risk
    if (response.ContentLength) {
      res.setHeader('Content-Length', response.ContentLength.toString());
    }
    
    // Stream chunks directly to the response as they arrive
    // This prevents loading the entire file into memory at once
    let totalLength = 0;
    for await (const chunk of response.Body as any) {
      const buffer = Buffer.from(chunk);
      totalLength += buffer.length;
      res.write(buffer);
    }
    
    console.log(`[API] Successfully streamed ${filename}, size: ${totalLength} bytes`);
    res.end();
    
  } catch (error: any) {
    console.error('[API] Error serving game file:', error);
    const errorMessage = error?.message || 'Unknown error';
    const errorName = error?.name || 'Error';
    
    // Provide more specific error messages
    let statusCode = 500;
    let userMessage = 'Failed to load game file';
    
    const requestedFilename = typeof req.query.filename === 'string' ? req.query.filename : 'unknown';
    
    if (errorName === 'NoSuchKey' || errorMessage.includes('does not exist') || errorMessage.includes('NoSuchKey')) {
      statusCode = 404;
      userMessage = `Game file not found: ${requestedFilename}`;
    } else if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
      statusCode = 504;
      userMessage = 'Request timeout - file may be too large';
    } else if (errorMessage.includes('Missing required R2')) {
      statusCode = 500;
      userMessage = 'Server configuration error';
    }
    
    // Log full error details for debugging
    console.error('[API] Error details:', {
      filename: req.query.filename,
      gameName: req.query.gameName,
      error: errorMessage,
      errorName,
      code: error?.code,
      requestId: error?.$metadata?.requestId,
      stack: error?.stack?.substring(0, 500) // Limit stack trace length
    });
    
    // For production, include error details in response to help debug
    // This is safe since it's just error messages, not sensitive data
    return res.status(statusCode).json({ 
      error: userMessage,
      filename: requestedFilename,
      details: errorMessage,
      errorName: errorName,
      code: error?.code
    });
  }
}
