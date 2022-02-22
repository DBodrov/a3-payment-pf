import React from 'react';
import {Section} from '@/layouts';
import {CCForm} from '../CCForm';

export function PaySection() {

  return (
    <Section
      css={{
        marginRight: 'auto',
        padding: '3.75rem 1rem 0 3rem',
        marginLeft: 0,
        '@media (min-width: 992px)': {borderLeft: '1px var(--color-border) solid'},
      }}>
      <CCForm />
    </Section>
  );
}
