import React from 'react';
import {Screen} from '@/layouts';
import {PaymentProvider, PFInfoProvider, AppErrorBoundary} from '@/context';
import {PaymentInfo} from './PaymentInfo';
import {PaySection} from './PaySection';

export function PaymentPage() {
  return (
    <AppErrorBoundary>
      <Screen>
        <PFInfoProvider>
          <PaymentInfo />
          <PaymentProvider>
            <PaySection />
          </PaymentProvider>
        </PFInfoProvider>
      </Screen>
    </AppErrorBoundary>
  );
}
