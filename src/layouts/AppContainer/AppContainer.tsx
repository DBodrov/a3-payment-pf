import React from 'react';
import {Outlet} from 'react-router-dom';
import {PaymentProvider, ConfigProvider} from '@/context';

export function AppContainer() {
  return (
    <PaymentProvider>
      <ConfigProvider>
        <Outlet />
      </ConfigProvider>
    </PaymentProvider>
  );
}
