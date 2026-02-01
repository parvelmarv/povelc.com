import type { NextApiRequest, NextApiResponse } from 'next';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName } from '@/lib/r2Config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const r2Client = getR2Client();
    const bucketName = getR2BucketName();

    console.log(`[R2 Test] Testing connection to bucket: ${bucketName}`);

    // List objects in the bucket to verify access
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 50, // List first 50 files
    });

    const response = await r2Client.send(listCommand);

    const files = response.Contents?.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
    })) || [];

    return res.status(200).json({
      success: true,
      bucket: bucketName,
      fileCount: files.length,
      files: files,
      message: 'R2 access verified successfully'
    });

  } catch (error: any) {
    console.error('R2 access test failed:', error);
    
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.Code || error?.name || 'Unknown';
    
    return res.status(500).json({
      success: false,
      error: 'Failed to access R2',
      details: process.env.NODE_ENV === 'development' ? {
        message: errorMessage,
        code: errorCode,
        stack: error?.stack
      } : undefined
    });
  }
}
