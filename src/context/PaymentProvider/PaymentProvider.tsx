import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loader} from '@a3/frontkit';
import {useCardPay} from './use-cardPay';
import {usePaymentQuery} from './use-payment-query';
import type {TPaymentContext, IPFInfo} from './types';
import {readTransactionStatus} from '@/screens/PaymentPage/PaySection/utils';

const PaymentContext = React.createContext<TPaymentContext | undefined>(undefined);
PaymentContext.displayName = 'PaymentContext';

export function PaymentProvider({children}: {children: React.ReactNode}) {
  const {transactionId = ''} = useParams<string>();
  const navigate = useNavigate();
  const {isLoading, paReq, paymentInfo, transactionStatus} = usePaymentQuery(transactionId);
  const info = paymentInfo as IPFInfo;

  const {mutate, isLoading: cardSubmitting, isSuccess: cardSubmitted} = useCardPay();

  React.useEffect(() => {
    const status = readTransactionStatus(transactionStatus);
    console.log('transaction status', status, 'isLoading', isLoading);

    if (status === 'success') {
      navigate('./success');
    }
    if (status === 'fail') {
      navigate('./fail');
    }
    if (status === 'three_ds') {
      navigate('./threeds');
    }
  }, [isLoading, navigate, transactionStatus]);

  const ctx = React.useMemo<TPaymentContext>(
    () => ({
      info,
      cardSubmitted,
      cardSubmitting,
      makeCardPayment: mutate,
      transactionStatus: transactionStatus,
      paReq,
    }),
    [cardSubmitted, cardSubmitting, info, mutate, paReq, transactionStatus],
  );

  if (isLoading) {
    return (
      <Loader fullscreen>
        <span>Загрузка...</span>
      </Loader>
    );
  }

  return <PaymentContext.Provider value={ctx}>{children}</PaymentContext.Provider>;
}

export const usePayment = () => {
  const context = React.useContext(PaymentContext);
  if (!context) {
    throw new Error('context three error');
  }
  return context;
};
