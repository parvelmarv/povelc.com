import { S3Client } from '@aws-sdk/client-s3';

let r2ClientInstance: S3Client | null = null;

export function getR2Client(): S3Client {
  if (r2ClientInstance) {
    return r2ClientInstance;
  }

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
    throw new Error(`Missing required R2 environment variables: ${missing.join(', ')}`);
  }

  r2ClientInstance = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  return r2ClientInstance;
}

export function getR2BucketName(): string {
  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
  if (!R2_BUCKET_NAME) {
    throw new Error('Missing required R2 environment variable: R2_BUCKET_NAME');
  }
  return R2_BUCKET_NAME;
}
