import crypto from 'crypto';

export const verifyPaystackSignature = (rawBody: string, signature: string, secret: string): boolean => {
  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  return hash === signature;
};