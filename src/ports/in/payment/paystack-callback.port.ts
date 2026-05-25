export interface PaystackCallbackPort {
    handleCallback(reference: string): Promise<void>;
  }