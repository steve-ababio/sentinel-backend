import { PaystackCallbackUseCase } from "@domain/application/payment/paystack-callback.use-case";
import { PaystackWebhookUseCase } from "@domain/application/payment/paystack-webhook.use-case";
import { SaveUserCardUseCase } from "@domain/application/payment/save-user-card.use-case";
import { ChargeCardUseCase } from "@domain/application/payment/charge-card.use-case";
import { PaystackPaymentService } from "@infrastructure/paystack/paystack-payment.service";
import { PaystackCallbackPort } from "@ports/in/payment/paystack-callback.port";
import { PaystackWebhookPort } from "@ports/in/payment/paystack-webhook.port";
import { SaveUserCardPort } from "@ports/in/payment/save-user-card.port";
import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { container } from "tsyringe";
import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { ChargeMobileMoneyUseCase } from "@domain/application/payment/charge-mobile-money.use-case";

import { GetSavedCardsPort } from "@ports/in/payment/get-saved-cards.port";
import { GetSavedCardsUseCase } from "@domain/application/payment/get-saved-cards.use-case";
import { VerifyPaymentPort } from "@ports/in/payment/verify-payment.port";
import { VerifyPaymentUseCase } from "@domain/application/payment/verify-payment.use-case";

container.register<PaystackPaymentPort>("PaystackPaymentPort", {
    useClass: PaystackPaymentService
});

container.register<PaystackCallbackPort>("PaystackCallbackPort", {
    useClass: PaystackCallbackUseCase
});

container.register<PaystackWebhookPort>("PaystackWebhookPort", {
    useClass: PaystackWebhookUseCase
});

container.register<SaveUserCardPort>("SaveUserCardPort", {
    useClass: SaveUserCardUseCase
});

container.register<ChargeCardPort>("ChargeCardPort", {
    useClass: ChargeCardUseCase
});

container.register<ChargeMobileMoneyPort>("ChargeMobileMoneyPort", {
    useClass: ChargeMobileMoneyUseCase
});

container.register<GetSavedCardsPort>("GetSavedCardsPort", {
    useClass: GetSavedCardsUseCase
});

container.register<VerifyPaymentPort>("VerifyPaymentPort", {
    useClass: VerifyPaymentUseCase
});