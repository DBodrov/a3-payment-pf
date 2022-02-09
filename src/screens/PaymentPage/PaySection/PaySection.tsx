import React from 'react';
import {useNavigate} from 'react-router-dom';
import {usePayment, usePFInfo} from '@/context';
import {Section} from '@/layouts';
import {CCForm} from '../CCForm';
import {ThreeDSFrame} from './ThreeDSFrame';

export function PaySection() {
  // const googlePayContainerRef = React.useRef<HTMLDivElement>(null);
  const {transactionResult} = usePayment();
  const {transactionId} = usePFInfo();

  const navigate = useNavigate();

  console.info(transactionResult);

  // React.useEffect(() => {
  //   if (showGooglePayButton && Boolean(googlePayContainerRef.current !== null)) {
  //     addGooglePayButton(googlePayContainerRef.current!);
  //   }
  // }, [addGooglePayButton, showGooglePayButton]);
  React.useEffect(() => {
    if (transactionResult === 'SUCCESS') {
      navigate('../success', {state: {transactionId}});
    }
    if (transactionResult === 'FAIL') {
      navigate('../fail', {state: {transactionId}});
    }
  }, [navigate, transactionId, transactionResult]);

  if (transactionResult === 'THREE_DS') {
    return <ThreeDSFrame />;
  }


  return (
    <Section css={{marginRight: 'auto', padding: '3.75rem 1rem 0 3rem', marginLeft: 0}}>
      {/* <div
            css={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '4rem',
              width: 300,
              alignSelf: 'center',
            }}
            ref={googlePayContainerRef}></div> */}
      <CCForm />
    </Section>
  );
}
