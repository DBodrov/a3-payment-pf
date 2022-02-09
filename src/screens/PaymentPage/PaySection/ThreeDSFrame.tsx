import React from 'react';
import {usePayment, usePFInfo} from '@/context';
import {Section} from '../styles';

export function ThreeDSFrame() {
  const {paReq = '', setCardPayState} = usePayment();
  const {transactionId} = usePFInfo();
  const sectionRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    const transactionListener = (e: MessageEvent) => {
      if (e.data?.type !== 'transaction result') {
        return;
      }
      console.log(e)
      if (e.data.signature === transactionId) {
        const result = e.data.success ? 'SUCCESS' : 'FAIL';
        setCardPayState({paReq: '', result});
      }
    };
    window.addEventListener('message', transactionListener);

    return () => {
      window.removeEventListener('message', transactionListener);
    };
  }, [setCardPayState, transactionId]);

  return (
    <Section ref={sectionRef}>
      <iframe srcDoc={paReq} frameBorder="0" width="100%" height="100%" title="bankFrame"></iframe>
    </Section>
  );
}
