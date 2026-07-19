"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackPaymentService = void 0;
const types_1 = require("@common/global/types");
const logger_1 = require("@infrastructure/web/util/logger");
const axios_1 = __importDefault(require("axios"));
const logger = (0, logger_1.createLogger)('INFRASTRUCTURE', 'PAYSTACK');
class PaystackPaymentService {
    constructor() {
        this.paystackBaseUrl = process.env.PAYSTACK_BASE_URL;
        this.paystackSecretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
    }
    async initiatePayment(amount, orderCode, email, currency = types_1.Currency.GHANAIAN_CEDI) {
        const url = `${this.paystackBaseUrl}/transaction/initialize`;
        const requestData = {
            amount: Math.ceil(amount * 100),
            reference: orderCode,
            currency: currency.toUpperCase(),
            email: email
        };
        try {
            const response = await axios_1.default.post(url, requestData, {
                headers: {
                    'Authorization': this.paystackSecretKey,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status) {
                return response.data.data.authorization_url;
            }
            else {
                throw new Error('Failed to initiate payment');
            }
        }
        catch (error) {
            logger.error('Error initiating Paystack payment:', error);
            throw new Error('Paystack request failed');
        }
    }
    async verifyPayment(reference) {
        const url = `${this.paystackBaseUrl}/transaction/verify/${reference}`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    'Authorization': this.paystackSecretKey
                }
            });
            if (response.data.status && response.data.data.status === "success") {
                return {
                    verified: true,
                    message: response.data.message
                };
            }
            else {
                return {
                    verified: false,
                    message: response.data.message
                };
            }
        }
        catch (error) {
            console.error('Error verifying payment:', error);
            throw new Error('Paystack verification failed');
        }
    }
    async chargeCard(card, email, amount, metadata) {
        const url = `${this.paystackBaseUrl}/charge`;
        const requestData = {
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
            const response = await axios_1.default.post(url, requestData, {
                headers: {
                    'Authorization': this.paystackSecretKey,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            logger.error('Error charging card via Paystack:', error.response?.data || error.message);
            if (error.response?.data) {
                return error.response.data;
            }
            throw new Error('Paystack charge request failed');
        }
    }
    async chargeAuthorization(authorization_code, email, amount, metadata) {
        const url = `${this.paystackBaseUrl}/charge`;
        const requestData = {
            email,
            amount: Math.ceil(amount * 100),
            authorization_code
        };
        if (metadata) {
            requestData.metadata = metadata;
        }
        try {
            const response = await axios_1.default.post(url, requestData, {
                headers: {
                    'Authorization': this.paystackSecretKey,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            logger.error('Error charging authorization via Paystack:', error.response?.data || error.message);
            if (error.response?.data) {
                return error.response.data;
            }
            throw new Error('Paystack charge authorization request failed');
        }
    }
    async chargeMobileMoney(mobileMoney, email, amount, metadata) {
        const url = `${this.paystackBaseUrl}/charge`;
        const requestData = {
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
            const response = await axios_1.default.post(url, requestData, {
                headers: {
                    'Authorization': this.paystackSecretKey,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            logger.error('Error charging mobile money via Paystack:', error.response?.data || error.message);
            if (error.response?.data) {
                return error.response.data;
            }
            throw new Error('Paystack mobile money charge request failed');
        }
    }
}
exports.PaystackPaymentService = PaystackPaymentService;
