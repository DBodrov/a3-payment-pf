import React from 'react';
import {Span} from '@a3/frontkit';
import {usePFInfo} from '@/context';
import {Section} from '../styles';

export function PaymentInfo() {
  const {totalAmount, description} = usePFInfo();
  const total = isFinite(totalAmount)
    ? totalAmount.toLocaleString('ru', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
      })
    : '';
  return (
    <Section>
      <Span>К оплате {total}</Span>
      <Span>{description}</Span>

    </Section>
  )
}
