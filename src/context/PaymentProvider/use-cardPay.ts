import React from 'react';
import {useMutation} from 'react-query';
import {paymentProcess, TPaymentResponse} from '@/api';

const initCardPayState: Partial<TPaymentResponse['data']> = {
  paReq: '',
};

export function useCardPay() {
  const [{paReq, result, transactionId}, dispatch] = React.useReducer(
    (s: TPaymentResponse['data'], a: Partial<TPaymentResponse['data']>) => ({...s, ...a}),
    initCardPayState,
  );
  const mutateBankResponse = useMutation(paymentProcess, {
    useErrorBoundary: true,
    onError: error => console.error('error ', error),
    onSuccess: data => {
      dispatch({paReq: data.data.paReq, result: data.data.result, transactionId: data.data.transactionId});
    },
  });

  return {
    paReq,
    result,
    transactionId,
    mutateBankResponse,
    setCardPayState: dispatch
  };
}
