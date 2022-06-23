import {isProd} from '@/utils/env.utils';
import * as IYaPay from './yapay.types';

export type TPaymentArgs = {
  googlePayToken?: string;
  applePayToken?: string;
  sbp?: boolean;
  yaPayToken?: string;
};

const isProduction = isProd();

export const createPaymentData = (order: IYaPay.Order): IYaPay.PaymentData => {
  const paymentData: IYaPay.PaymentData = {
    env: IYaPay.PaymentEnv.Sandbox,
    version: 2,
    countryCode: IYaPay.CountryCode.Ru,
    currencyCode: IYaPay.CurrencyCode.Rub,
    merchant: {
      id: '5971840b-d23e-43ce-97c7-12c8e53d5ec0',
      name: 'a3payments',
      url: 'https://a-3.ru',
    },
    order,
    paymentMethods: [
      {
        type: IYaPay.PaymentMethodType.Card,
        gateway: 'a3payments',
        gatewayMerchantId: isProduction ? '777777777' : 'test-gateway-merchant-id',
        allowedAuthMethods: [IYaPay.AllowedAuthMethod.PanOnly],
        allowedCardNetworks: [
          IYaPay.AllowedCardNetwork.Visa,
          IYaPay.AllowedCardNetwork.Mastercard,
          IYaPay.AllowedCardNetwork.Mir,
          IYaPay.AllowedCardNetwork.Maestro,
          IYaPay.AllowedCardNetwork.VisaElectron,
        ],
      },
    ],
  };

  return paymentData;
};
