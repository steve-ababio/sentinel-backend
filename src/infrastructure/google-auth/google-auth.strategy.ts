import { logger } from '@infrastructure/web/util/logger';
import { OAuth2Client } from 'google-auth-library';
import { injectable } from 'tsyringe';


@injectable()
export class GoogleAuthStrategy {
  private oauthClient: OAuth2Client;

  constructor() {
    // Initialize the OAuth2Client with your backend's client ID
    this.oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);
  }

  async verifyToken(idToken: string) {
    try {
      // Verify the ID token
      const ticket = await this.oauthClient.verifyIdToken({
        idToken
      });

      // Get the token payload
      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('Invalid token payload');
      }

      // Extract user details from the payload
      const { email, sub: id, name: displayName } = payload;
      return { email, id, displayName };
    } catch (error) {
      logger.error(error)
      throw new Error('Invalid Google ID token');
    }
  }
}