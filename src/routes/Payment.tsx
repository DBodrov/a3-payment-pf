import React from 'react';
import {PFInfoProvider, AppErrorBoundary} from '@/context';
import {PaymentPage} from '@/screens';

export function Payment() {
  return (
    <AppErrorBoundary>
      <PFInfoProvider>
        <PaymentPage />
      </PFInfoProvider>
    </AppErrorBoundary>
  );
}
