import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loader} from '@a3/frontkit';
import {usePaymentProcess} from './use-payment-process';
import {usePaymentQuery} from './use-payment-query';
import {useClientInfo} from './use-client-info';
import type {TPaymentContext, IPFInfo, TPaymentType} from './types';
import {readTransactionStatus} from '@/screens/PaymentPage/PaySection/utils';

const PaymentContext = React.createContext<TPaymentContext | undefined>(undefined);
PaymentContext.displayName = 'PaymentContext';

export function PaymentProvider({children}: {children: React.ReactNode}) {
  const {transactionId = ''} = useParams<string>();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = React.useState<TPaymentType | null>(null);
  const {isLoading, paReq, paymentInfo, transactionStatus} = usePaymentQuery(transactionId);
  const info = paymentInfo as IPFInfo;

  const {mutate, isLoading: isSubmitting, isSuccess: isSubmitted} = usePaymentProcess();

  const clientInfo = useClientInfo();

  React.useEffect(() => {
    const status = readTransactionStatus(transactionStatus);
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
      isSubmitted,
      isSubmitting,
      makePayment: mutate,
      transactionStatus: transactionStatus,
      paReq,
      clientInfo,
      paymentType,
      setPaymentType,
    }),
    [clientInfo, info, isSubmitted, isSubmitting, mutate, paReq, paymentType, transactionStatus],
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
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
