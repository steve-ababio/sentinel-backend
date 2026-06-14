

import { Currency } from '@common/global/types';
import { createLogger } from '@infrastructure/web/util/logger';
import { PaystackPaymentPort } from '@ports/out/payment/paystack.payment';
import axios from 'axios';

const logger = createLogger('INFRASTRUCTURE', 'PAYSTACK');

export class PaystackPaymentService implements PaystackPaymentPort {
  private readonly paystackBaseUrl: string = process.env.PAYSTACK_BASE_URL as string;
  private readonly paystackSecretKey: string = `Bearer ${process.env.PAYSTACK_SECRET_KEY as string}`;
    
  async initiatePayment(amount: number, orderCode: string, email: string, currency: string = Currency.GHANAIAN_CEDI): Promise<string> {
    const url = `${this.paystackBaseUrl}/transaction/initialize`;

    const requestData = {
      amount: Math.ceil(amount * 100), // Paystack uses minor currency units
      reference: orderCode,
      currency: currency.toUpperCase(), // Default to 'GHS' if not provided
      email: email
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Authorization': this.paystackSecretKey,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        return response.data.data.authorization_url;
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      logger.error('Error initiating Paystack payment:', error);
      throw new Error('Paystack request failed');
    }
  }


  async verifyPayment(reference: string): Promise<any> {
    const url = `${this.paystackBaseUrl}/transaction/verify/${reference}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': this.paystackSecretKey
        }
      });

      if (response.data.status && response.data.data.status === "success") {
        return {
          verified: true,
          message: response.data.message
        };
      } else {
        return {
          verified: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Paystack verification failed');
    }
  }

  async chargeCard(card: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any> {
    const url = `${this.paystackBaseUrl}/charge`;

    const requestData: any = {
      email,
      amount: Math.ceil(amount * 100), 
      card: {
        number: card.cardNumber,
        cvv: card.cvc,
        expiry_month: card.expMonth,
        expiry_year: card.expYear
      }
    };

    if (metadata) {
      requestData.metadata = metadata;
    }

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Authorization': this.paystackSecretKey,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error: any) {
      logger.error('Error charging card via Paystack:', error.response?.data || error.message);
      if (error.response?.data) {
        return error.response.data; // Return Paystack's specific error data (e.g. requires PIN)
      }
      throw new Error('Paystack charge request failed');
    }
  }

  async chargeAuthorization(authorization_code: string, email: string, amount: number, metadata?: Record<string, any>): Promise<any> {
    const url = `${this.paystackBaseUrl}/charge`;

    const requestData: any = {
      email,
      amount: Math.ceil(amount * 100), 
      authorization_code
    };

    if (metadata) {
      requestData.metadata = metadata;
    }

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Authorization': this.paystackSecretKey,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error: any) {
      logger.error('Error charging authorization via Paystack:', error.response?.data || error.message);
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Paystack charge authorization request failed');
    }
  }

  async chargeMobileMoney(mobileMoney: any, email: string, amount: number, metadata?: Record<string, any>): Promise<any> {
    const url = `${this.paystackBaseUrl}/charge`;

    const requestData: any = {
      email,
      amount: Math.ceil(amount * 100), 
      mobile_money: {
        phone: mobileMoney.phoneNumber,
        provider: mobileMoney.provider
      }
    };

    if (metadata) {
      requestData.metadata = metadata;
    }

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Authorization': this.paystackSecretKey,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error: any) {
      logger.error('Error charging mobile money via Paystack:', error.response?.data || error.message);
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Paystack mobile money charge request failed');
    }
  }
}