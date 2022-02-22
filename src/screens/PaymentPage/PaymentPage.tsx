import React from 'react';
import {Footer, PageLayout} from '@/layouts';
import {PaymentInfo} from './PaymentInfo';
import {PaySection} from './PaySection';

export function PaymentPage() {
  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap'}}>
      <PageLayout>
        <PaymentInfo />
        <PaySection />
      </PageLayout>
      <Footer />
    </div>
  );
}
