import {useMutation, useQueryClient} from 'react-query';
import {paymentProcess} from '@/api';

export function useCardPay() {
  const queryClient = useQueryClient();
  const mutateBankResponse = useMutation(paymentProcess, {
    useErrorBoundary: true,
    onError: error => console.error('error ', error),
    onSuccess: async data => {
      const transactionId = data?.data?.transactionId;
      queryClient.invalidateQueries(['payment status', transactionId]);
    },
  });

  const {mutate, ...mutateCardDataInfo} = mutateBankResponse;

  return {
    mutate,
    ...mutateCardDataInfo
  };
}
