import React from 'react';
import {useCardPay} from './use-cardPay';
import type {TPaymentContext} from './types';

const PaymentContext = React.createContext<TPaymentContext | undefined>(undefined);
PaymentContext.displayName = 'PaymentContext';

export function PaymentProvider({children}: {children: React.ReactNode}) {
  //  const {isComplete, isPaymentsAvailable} = useApplePay();
  // const {
  //   showGooglePayButton,
  //   status: googlePayStatus,
  //   isLoading: isGooglePayLoading,
  //   addGooglePayButton,
  //   makeGooglePayment,
  // } = useGooglePay();

  const {mutateBankResponse, paReq, result, setCardPayState} = useCardPay();
  const {isLoading: cardSubmitting, isSuccess: cardSubmitted} = mutateBankResponse;

  const ctx = React.useMemo<TPaymentContext>(
    () => ({
      cardSubmitted,
      cardSubmitting,
      makeCardPayment: mutateBankResponse.mutate,
      transactionResult: result,
      paReq: paReq,
      setCardPayState,
    }),
    [cardSubmitted, cardSubmitting, mutateBankResponse.mutate, paReq, result, setCardPayState],
  );

  // if (cardPaymentIsLoading) {
  //   return <Loader />;
  // }

  return <PaymentContext.Provider value={ctx}>{children}</PaymentContext.Provider>;
}

export const usePayment = () => {
  const context = React.useContext(PaymentContext);
  if (!context) {
    throw new Error('context three error');
  }
  return context;
};
