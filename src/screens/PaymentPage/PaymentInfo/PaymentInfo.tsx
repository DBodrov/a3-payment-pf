import React from 'react';
import {Span, H1} from '@a3/frontkit';
import {usePayment} from '@/context';
import {Section} from '@/layouts';
import {toCurrency} from '@/utils/string.utils'
import {InfoSection, PayDetailsTable} from './styles';

export function PaymentInfo() {
  const {info} = usePayment();
  const {amount, totalAmount, fee, description} = info;
  const total = toCurrency(totalAmount);
  return (
    <Section withBackward >
      <InfoSection>
        <Span css={{color: 'var(--color-text-secondary)', padding: '1rem 0'}}>К оплате</Span>
        <H1>{total}</H1>
        <PayDetailsTable>
          <Span css={{color: 'var(--color-text-secondary)'}}>Сумма платежа:</Span>
          <Span>{toCurrency(amount)}</Span>
          <Span css={{color: 'var(--color-text-secondary)'}}>Сумма комиссии:</Span>
          <Span>{toCurrency(fee)}</Span>
        </PayDetailsTable>
        <Span>{description}</Span>
      </InfoSection>
    </Section>
  );
}
