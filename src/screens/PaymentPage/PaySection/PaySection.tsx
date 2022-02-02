import React from 'react';
import {usePayment, usePFInfo} from '@/context';
import {CCForm} from '../CCForm';
import {ThreeDSFrame} from './ThreeDSFrame';
import {Section} from '../styles';


export function PaySection() {
  const googlePayContainerRef = React.useRef<HTMLDivElement>(null);
  const {showGooglePayButton, addGooglePayButton, isLoading, transactionResult} = usePayment();

  React.useEffect(() => {
    if (showGooglePayButton && Boolean(googlePayContainerRef.current !== null)) {
      addGooglePayButton(googlePayContainerRef.current!);
    }
  }, [addGooglePayButton, showGooglePayButton]);

  if (transactionResult === 'THREE_DS') {
    return <ThreeDSFrame />
  }

  return (
    <Section>

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
  )
}
