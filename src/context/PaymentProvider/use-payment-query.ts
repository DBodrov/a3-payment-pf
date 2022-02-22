import {useQuery} from 'react-query';
import {readPaymentInfo, getPaymentStatus} from '@/api';

export function usePaymentQuery(transactionId: string) {
  const {data: paymentInfo, ...queryPaymentInfo} = useQuery(
    ['payment info', transactionId],
    () => readPaymentInfo(transactionId),
    {
      enabled: Boolean(transactionId),
      staleTime: Infinity,
      retry: false,
      useErrorBoundary: true,
    },
  );

  const {data: statusData, ...queryStatusInfo} = useQuery(
    ['payment status', transactionId],
    () => getPaymentStatus(transactionId),
    {
      enabled: Boolean(transactionId),
      staleTime: Infinity,
      retry: false,
    },
  );

  const isLoading = queryPaymentInfo.isIdle || queryPaymentInfo.isLoading || queryStatusInfo.isLoading;
  const transactionIsOpen =
    statusData?.code === 200 && statusData.data.transactionStatus === 'HOLD_3DS_WAITING';
  const transactionStatus = statusData?.data?.transactionStatus;

  return {
    isLoading,
    transactionIsOpen,
    paymentInfo: paymentInfo?.data,
    transactionStatus,
    paReq: statusData?.data?.paReq,
  };
}
