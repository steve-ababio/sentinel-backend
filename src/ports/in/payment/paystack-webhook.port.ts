export interface PaystackWebhookPort {
    handleWebhook(event: any): Promise<void>;
  }