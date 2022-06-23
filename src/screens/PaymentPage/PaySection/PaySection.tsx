import React from 'react';
import {usePayment} from '@/context';
import {Section} from '@/layouts';
import {CCForm} from '../CCForm';
import {ClientInfoForm} from './ClientInfo';
import {YandexPay} from './YandexPay';

export function PaySection() {

  const {info} = usePayment();
  const {config} = info;
  const layoutOrder = config.layout?.paymentSystemOrder || ['card']

  return (
    <Section
      css={{
        marginRight: 'auto',
        padding: '3.75rem 1rem 0 3rem',
        marginLeft: 0,
        '@media (min-width: 992px)': {borderLeft: '1px var(--color-border) solid'},
      }}>
      <ClientInfoForm />
      <section
        css={{
          display: 'flex',
          maxWidth: 704,
          width: '100%',
          flexFlow: `${layoutOrder[0] === 'card' ? 'column' : 'column-reverse'} nowrap`,
        }}>
        <CCForm />
        <section css={{display: 'flex', flexFlow: 'column nowrap', padding: '2rem 0'}}>
        <YandexPay />
        </section>
      </section>
    </Section>
  );
}
