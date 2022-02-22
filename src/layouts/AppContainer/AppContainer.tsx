import React from 'react';
import {Outlet} from 'react-router-dom';
import {PaymentProvider} from '@/context'


export function AppContainer() {

  return (
    <PaymentProvider>
      <Outlet />
    </PaymentProvider>
  )


}
