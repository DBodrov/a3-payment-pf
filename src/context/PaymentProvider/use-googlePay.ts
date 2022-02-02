import React from 'react';
import {paymentProcess} from '@/api';
import {usePFInfo} from '@/context';
import {useScript} from '@/utils/use-script';
import {
  isGooglePayLoaded,
  getGooglePaymentDataRequest,
  getGooglePaymentsClient,
  getGoogleIsReadyToPayRequest,
} from './google-pay.utils';
import type {TGooglePayState, PaymentFunction} from './types';

const googlePayInitState: TGooglePayState = {
  status: 'idle',
  showGooglePayButton: false,
};

function googlePayReducer(state: TGooglePayState, changes: Partial<TGooglePayState>) {
  return {
    ...state,
    ...changes,
  };
}

export function useGooglePay() {
  const {totalAmount, transactionId} = usePFInfo();
  // const {authToken} = useAuth();
  const [{status, showGooglePayButton}, dispatch] = React.useReducer(googlePayReducer, googlePayInitState);
  const {stateScript} = useScript('https://pay.google.com/gp/p/js/pay.js');

  const makeGooglePayment: PaymentFunction = React.useCallback(() => {
    dispatch({status: 'started'});
    const paymentDataRequest = getGooglePaymentDataRequest(totalAmount.toString());

    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then(async paymentData => {
        const payment = {
          ...paymentData,
          returnUrl: `${window.location.origin}/result`,
          // email: clientInfo?.email,
        };

        await paymentProcess(payment, {token: transactionId});
        dispatch({status: 'complete'});
      })
      .catch(function (err) {
        // show error in developer console for debugging
        console.error(err);
        dispatch({status: 'canceled'});
      });
  }, [totalAmount, transactionId]);

  const addGooglePayButton = React.useCallback(
    (container: HTMLElement) => {
      const payClient = getGooglePaymentsClient();
      const button = payClient.createButton({
        onClick: makeGooglePayment as any,
        buttonType: 'pay',
        buttonSizeMode: 'fill',
      });
      container.appendChild(button);
    },
    [makeGooglePayment],
  );

  React.useEffect(() => {
    dispatch({status: 'loading'});
    if (stateScript === 'success' && isGooglePayLoaded()) {
      const payClient = getGooglePaymentsClient();
      payClient
        .isReadyToPay(getGoogleIsReadyToPayRequest())
        .then(response => {
          dispatch({status: 'success', showGooglePayButton: response.result});
        })
        .catch(error => {
          console.info(error);
          dispatch({status: 'error', showGooglePayButton: false});
        });
    }
  }, [stateScript]);

  return {
    hasGooglePay: isGooglePayLoaded(),
    showGooglePayButton,
    status,
    isLoading: status === 'idle' || status === 'loading' || status === 'started',
    addGooglePayButton,
    makeGooglePayment,
  };
}
