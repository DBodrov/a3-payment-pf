import type {TBaseCardPaymentMethod} from './types';

export function isGooglePayLoaded(): boolean {
  return 'google' in (window || global) && Boolean(google?.payments?.api?.PaymentsClient);
}

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
};

const baseCardPaymentMethod: TBaseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedCardNetworks: ['VISA', 'MASTERCARD'],
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
  },
};

const tokenizationSpecification: google.payments.api.PaymentMethodTokenizationSpecification = {
  type: 'DIRECT',
  parameters: {
    protocolVersion: 'ECv2',
    publicKey: 'BK3akuMZgeAk1b4YGdXNhrtd6j5WD7aAsNnYXJdFdBnMSG38sgYNnA7ZI360lKGija9IuOu0J9AKLafThNdnxOs=',
  },
};

const cardPaymentMethod = {...baseCardPaymentMethod, tokenizationSpecification: tokenizationSpecification};

export function getGoogleIsReadyToPayRequest() {
  return Object.assign({}, baseRequest, {
    allowedPaymentMethods: [baseCardPaymentMethod],
  });
}

let paymentsClient: google.payments.api.PaymentsClient | null = null;



export function getGooglePaymentsClient() {
  if (paymentsClient === null) {
    paymentsClient = new google.payments.api.PaymentsClient({
      environment: 'TEST',
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'A3 Test',
      }
    });
  }
  return paymentsClient;
}

export function getGooglePaymentDataRequest(totalPrice: string): google.payments.api.PaymentDataRequest {
  const paymentDataRequest: google.payments.api.PaymentDataRequest = {
    ...baseRequest,
    allowedPaymentMethods: [cardPaymentMethod],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'A3 Test',
    },
    transactionInfo: {
      totalPrice,
      countryCode: 'RU',
      currencyCode: 'RUB',
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
    },
  };

  return paymentDataRequest;
}
