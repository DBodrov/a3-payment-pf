import React from 'react';
import {paymentProcess} from '@/api';

type TCardPayState = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  transactionResult: '' | 'THREE_DS' | 'SUCCESS' | 'FAIL';
  paReq: string;
};

const initCardPayState: TCardPayState = {
  status: 'idle',
  transactionResult: '',
  paReq: '',
};

const cardPayReducer = (state: TCardPayState, changes: Partial<TCardPayState>) => ({...state, ...changes});

export function useCardPay() {
  const [{status, transactionResult, paReq}, dispatch] = React.useReducer(cardPayReducer, initCardPayState);

  const handleSubmitCardForm = React.useCallback(async (paymentData: any) => {
    try {
      dispatch({status: 'pending'});
      const paymentResult = await paymentProcess(paymentData);

      if (paymentResult.data.result === 'THREE_DS') {
        dispatch({status: 'resolved', transactionResult: 'THREE_DS', paReq: paymentResult.data.paReq});
      }
    } catch (error) {}
  }, []);

  return {
    status,
    isLoading: status === 'pending',
    transactionResult,
    handleSubmitCardForm,
    paReq
  }
}
