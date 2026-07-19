"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paystack_callback_use_case_1 = require("@domain/application/payment/paystack-callback.use-case");
const paystack_webhook_use_case_1 = require("@domain/application/payment/paystack-webhook.use-case");
const save_user_card_use_case_1 = require("@domain/application/payment/save-user-card.use-case");
const charge_card_use_case_1 = require("@domain/application/payment/charge-card.use-case");
const paystack_payment_service_1 = require("@infrastructure/paystack/paystack-payment.service");
const tsyringe_1 = require("tsyringe");
const charge_mobile_money_use_case_1 = require("@domain/application/payment/charge-mobile-money.use-case");
const get_saved_cards_use_case_1 = require("@domain/application/payment/get-saved-cards.use-case");
const verify_payment_use_case_1 = require("@domain/application/payment/verify-payment.use-case");
tsyringe_1.container.register("PaystackPaymentPort", {
    useClass: paystack_payment_service_1.PaystackPaymentService
});
tsyringe_1.container.register("PaystackCallbackPort", {
    useClass: paystack_callback_use_case_1.PaystackCallbackUseCase
});
tsyringe_1.container.register("PaystackWebhookPort", {
    useClass: paystack_webhook_use_case_1.PaystackWebhookUseCase
});
tsyringe_1.container.register("SaveUserCardPort", {
    useClass: save_user_card_use_case_1.SaveUserCardUseCase
});
tsyringe_1.container.register("ChargeCardPort", {
    useClass: charge_card_use_case_1.ChargeCardUseCase
});
tsyringe_1.container.register("ChargeMobileMoneyPort", {
    useClass: charge_mobile_money_use_case_1.ChargeMobileMoneyUseCase
});
tsyringe_1.container.register("GetSavedCardsPort", {
    useClass: get_saved_cards_use_case_1.GetSavedCardsUseCase
});
tsyringe_1.container.register("VerifyPaymentPort", {
    useClass: verify_payment_use_case_1.VerifyPaymentUseCase
});
