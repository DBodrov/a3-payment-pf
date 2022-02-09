import React from 'react';
import {Span} from '@a3/frontkit';
import {usePFInfo} from '@/context';
import {Section} from '@/layouts';

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
    <Section withBackward css={{borderRight: '1px var(--color-border) solid'}}>
      <Span>К оплате {total}</Span>
      <Span>{description}</Span>

    </Section>
  )
}
