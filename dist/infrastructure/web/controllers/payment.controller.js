"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../util/logger");
const constants_1 = require("@common/auth/constants");
const paystack_signature_1 = require("../util/paystack-signature");
const status_codes_1 = require("@common/web/status-codes");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'PAYMENT');
let PaymentController = class PaymentController {
    constructor(paystackCallbackPort, paystackWebhookPort, saveUserCardPort, chargeCardPort, chargeMobileMoneyPort, getSavedCardsPort, findAllTransactionsByUserPort, verifyPaymentPort) {
        this.paystackCallbackPort = paystackCallbackPort;
        this.paystackWebhookPort = paystackWebhookPort;
        this.saveUserCardPort = saveUserCardPort;
        this.chargeCardPort = chargeCardPort;
        this.chargeMobileMoneyPort = chargeMobileMoneyPort;
        this.getSavedCardsPort = getSavedCardsPort;
        this.findAllTransactionsByUserPort = findAllTransactionsByUserPort;
        this.verifyPaymentPort = verifyPaymentPort;
    }
    async getPaymentHistory(ctx) {
        const userId = ctx.state.jwtPayload.id;
        try {
            const history = await this.findAllTransactionsByUserPort.findAllTransactionsByUser(userId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message: 'Payment history retrieved successfully', data: history };
        }
        catch (error) {
            logger.error('Error in getPaymentHistory controller:', error);
            ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async getSavedCards(ctx) {
        const userId = ctx.state.jwtPayload.id;
        try {
            const cards = await this.getSavedCardsPort.getSavedCards(userId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message: 'Saved cards retrieved successfully', data: cards };
        }
        catch (error) {
            logger.error('Error in getSavedCards controller:', error);
            ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async chargeCard(ctx) {
        const { cardDetails, amount, email, courseId } = ctx.request.body;
        const userId = ctx.state.jwtPayload.id;
        const customerEmail = email;
        if (!cardDetails || !amount || !courseId) {
            ctx.status = status_codes_1.STATUS_CODES.BAD_REQUEST;
            ctx.body = { message: 'Card details, amount, and courseId are required' };
            return;
        }
        try {
            const response = await this.chargeCardPort.chargeCard(userId, customerEmail, cardDetails, amount, courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message: 'Charge processed', data: response };
        }
        catch (error) {
            logger.error('Error in chargeCard controller:', error);
            ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async chargeMobileMoney(ctx) {
        const { mobileMoney, amount, email, courseId } = ctx.request.body;
        const userId = ctx.state.jwtPayload.id;
        const customerEmail = email;
        if (!mobileMoney || !amount || !courseId) {
            ctx.status = status_codes_1.STATUS_CODES.BAD_REQUEST;
            ctx.body = { message: 'Mobile money details, amount, and courseId are required' };
            return;
        }
        try {
            const response = await this.chargeMobileMoneyPort.chargeMobileMoney(userId, customerEmail, mobileMoney, amount, courseId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message: 'Mobile money charge processed', data: response };
        }
        catch (error) {
            logger.error('Error in chargeMobileMoney controller:', error);
            ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async saveCard(ctx) {
        const { reference } = ctx.request.body;
        const userId = ctx.state.user.id;
        if (!reference) {
            ctx.status = 400;
            ctx.body = { message: 'No payment reference provided' };
            return;
        }
        try {
            const card = await this.saveUserCardPort.saveUserCard(userId, reference);
            ctx.status = 201;
            ctx.body = { message: 'Card saved successfully', data: card };
        }
        catch (error) {
            logger.error('Error saving user card:', error);
            ctx.status = 500;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async handleCallback(ctx) {
        const { reference } = ctx.query;
        if (!reference) {
            ctx.status = 400;
            ctx.body = { message: 'No reference provided' };
            return;
        }
        try {
            await this.paystackCallbackPort.handleCallback(reference);
            ctx.status = 200;
            ctx.body = { message: 'Payment processed successfully' };
        }
        catch (error) {
            console.error('Error processing Paystack callback:', error);
            ctx.status = 500;
            ctx.body = { message: constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async handleWebhook(ctx) {
        const event = ctx.request.body;
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        const signature = ctx.headers['x-paystack-signature'];
        if (!(0, paystack_signature_1.verifyPaystackSignature)(ctx.request.rawBody, signature, paystackSecret)) {
            ctx.status = 400;
            ctx.body = { message: 'Invalid signature' };
            return;
        }
        try {
            await this.paystackWebhookPort.handleWebhook(event);
            ctx.status = 200;
            ctx.body = { message: 'Webhook processed successfully' };
        }
        catch (error) {
            console.error('Error processing Paystack webhook:', error);
            ctx.status = 500;
            ctx.body = { message: constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
    async verifyPayment(ctx) {
        const { reference } = ctx.params;
        try {
            const payment = await this.verifyPaymentPort.verifyPayment(reference);
            console.log("verification response: ", payment);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = payment;
        }
        catch (error) {
            logger.error('Error in verifyPayment contro§ller:', error);
            ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || constants_1.MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }
};
exports.PaymentController = PaymentController;
exports.PaymentController = PaymentController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PaystackCallbackPort")),
    __param(1, (0, tsyringe_1.inject)("PaystackWebhookPort")),
    __param(2, (0, tsyringe_1.inject)("SaveUserCardPort")),
    __param(3, (0, tsyringe_1.inject)("ChargeCardPort")),
    __param(4, (0, tsyringe_1.inject)("ChargeMobileMoneyPort")),
    __param(5, (0, tsyringe_1.inject)("GetSavedCardsPort")),
    __param(6, (0, tsyringe_1.inject)("FindAllTransactionsByUserPort")),
    __param(7, (0, tsyringe_1.inject)("VerifyPaymentPort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], PaymentController);
