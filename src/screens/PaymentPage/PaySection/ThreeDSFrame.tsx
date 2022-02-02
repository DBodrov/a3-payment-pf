import React from 'react';
import {usePayment} from '@/context';
import {Section} from '../styles';

export function ThreeDSFrame() {
  const {paReq} = usePayment();
  return (
    <Section>
      <iframe srcDoc={paReq} frameBorder="0" title="bank3DS" height="100%" width="100%"></iframe>
    </Section>
  );
}
