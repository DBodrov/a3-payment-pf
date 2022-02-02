import React from 'react';
import {PaymentProvider} from '@/context';
import {CardPage} from '@/screens';

export function Card() {
  return (
    <PaymentProvider>
      <CardPage />
    </PaymentProvider>
  );
}
