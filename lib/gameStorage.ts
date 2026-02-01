import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName } from './r2Config';

export async function downloadGameFile(gameName: string, fileName: string): Promise<ArrayBuffer> {
  try {
    // Files are directly in Build/ folder, not in gameName/Build/
    const key = `Build/${fileName}`;

    const r2Client = getR2Client();
    const bucketName = getR2BucketName();

    console.log(`[R2] Attempting to fetch: Bucket="${bucketName}", Key="${key}"`);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await r2Client.send(command);
    
    if (!response.Body) {
      throw new Error('No response body received from R2');
    }

    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(chunk);
    }

    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result.buffer;
  } catch (error) {
    console.error('Error downloading game file:', error);
    throw error;
  }
}
