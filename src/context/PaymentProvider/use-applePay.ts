import React from 'react';
// import {appleVerify} from '@/utils/api';

const isDevelopment = process.env.NODE_ENV === 'development';

type TPaymentParams = {
  amount: number;
};

const MaybeApplePaySession = 'ApplePaySession' in window;
type TState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  isPaymentsAvailable: boolean;
  token?: string;
};

const initState: TState = {
  isPaymentsAvailable: false,
  status: 'idle',
  token: undefined,
};

const stateReducer = (state: TState, changes: Partial<TState>): TState => ({...state, ...changes});

export function useApplePay() {
  const [{isPaymentsAvailable, status, token}, dispatch] = React.useReducer(stateReducer, initState);

  const hasApplePayApiAvailable = MaybeApplePaySession;
  const merchantId = 'merchant.a-3.payments';
  console.log('has AP API', hasApplePayApiAvailable)

  // const makeApplePayment = React.useCallback((applepayParams: TPaymentParams) => {
  //   const {amount} = applepayParams;

  //   const request = {
  //     countryCode: 'RU',
  //     currencyCode: 'RUB',
  //     supportedNetworks: ['visa', 'masterCard'],
  //     merchantCapabilities: ['supports3DS'] as ApplePayJS.ApplePayMerchantCapability[],
  //     total: {
  //       label: 'Payment App',
  //       amount: String(amount),
  //     },
  //   };

  //   const session = new ApplePaySession(3, request);
  //   session.onvalidatemerchant = async (event: ApplePayJS.ApplePayValidateMerchantEvent) => {
  //     try {
  //       const merchantSession = await appleVerify();
  //       session.completeMerchantValidation(merchantSession.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   session.onpaymentauthorized = (e: ApplePayJS.ApplePayPaymentAuthorizedEvent) => {
  //     const applePayToken = Buffer.from(JSON.stringify(e.payment.token.paymentData), 'base64').toString();
  //     setToken(applePayToken);
  //   };
  //   session.completePayment = (result: ApplePayJS.ApplePayPaymentAuthorizationResult) => {
  //     // TODO:
  //     console.info('Fire complete callback', result);
  //   };
  //   session.begin();
  // }, []);

  React.useEffect(() => {

    const paymentAvailable = async () => {
      dispatch({status: 'loading'});
      try {
        const canMakePayments = await ApplePaySession.canMakePaymentsWithActiveCard(merchantId);
        console.log('canMake AP', canMakePayments)
        dispatch({status: 'success', isPaymentsAvailable: canMakePayments});
      } catch (error) {
        console.log('AP error', error)
        dispatch({status: 'error', isPaymentsAvailable: false});
      }
    };

    if (hasApplePayApiAvailable) {
      paymentAvailable();
    } else {
      dispatch({status: 'success', isPaymentsAvailable: false});
    }
  }, [hasApplePayApiAvailable]);

  return {
    isPaymentsAvailable,
    status,
    isComplete: status === 'success' || status === 'error',
    applepayToken: token,
    // makeApplePayment,
  };
}
