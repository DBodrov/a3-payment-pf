import React from 'react';
import {useQueryClient} from 'react-query';
import {usePayment} from '@/context';

export function ThreeDSPage() {
  const {
    paReq,
    info: {transactionId},
  } = usePayment();

  const queryClient = useQueryClient();

  React.useEffect(() => {
    const transactionListener = (e: MessageEvent) => {
      if (e.data?.type !== 'transaction result') {
        return;
      }
      if (e.data.signature === transactionId) {
        queryClient.invalidateQueries(['payment status', transactionId]);
      }
    };
    window.addEventListener('message', transactionListener);

    return () => {
      window.removeEventListener('message', transactionListener);
    };
  }, [queryClient, transactionId]);

  return (
    <div css={{display: 'flex', margin: 'auto', height: '100%', width: 'auto'}}>
      {Boolean(paReq) ? (
        <iframe
          srcDoc={paReq as string}
          frameBorder="0"
          width="100%"
          height="100%"
          title="bankFrame"></iframe>
      ) : null}
    </div>
  );
}
