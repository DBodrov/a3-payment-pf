import React from 'react';
import {useApplePay} from './use-applePay';
import {useGooglePay} from './use-googlePay';
import {useCardPay} from './use-cardPay';
import type {TPaymentContext} from './types';

const PaymentContext = React.createContext<TPaymentContext | undefined>(undefined);
PaymentContext.displayName = 'PaymentContext';

export function PaymentProvider({children}: {children: React.ReactNode}) {
  const {isComplete, isPaymentsAvailable} = useApplePay();
  const {
    showGooglePayButton,
    status: googlePayStatus,
    isLoading: isGooglePayLoading,
    addGooglePayButton,
    makeGooglePayment,
  } = useGooglePay();

  const {
    handleSubmitCardForm,
    status: cardPayStatus,
    transactionResult,
    isLoading: cardPaymentIsLoading,
    paReq,
  } = useCardPay();

  const ctx = React.useMemo<TPaymentContext>(
    () => ({
      isComplete,
      isLoading: isGooglePayLoading || cardPaymentIsLoading,
      uiMessage: '',
      isPaymentsAvailable,
      showGooglePayButton,
      googlePayStatus,
      addGooglePayButton,
      makeGooglePayment,
      makeCardPayment: handleSubmitCardForm,
      transactionResult,
      paReq,
    }),
    [
      addGooglePayButton,
      cardPaymentIsLoading,
      googlePayStatus,
      handleSubmitCardForm,
      isComplete,
      isGooglePayLoading,
      isPaymentsAvailable,
      makeGooglePayment,
      paReq,
      showGooglePayButton,
      transactionResult,
    ],
  );

  return <PaymentContext.Provider value={ctx}>{children}</PaymentContext.Provider>;
}

export const usePayment = () => {
  const context = React.useContext(PaymentContext);
  if (!context) {
    throw new Error('context three error');
  }
  return context;
};
