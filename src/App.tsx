import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PaymentPage, NotFound, PaySuccessPage, PayFailPage, ThreeDSPage} from '@/screens';
import {AppContainer} from '@/layouts';

export function App() {
  return (
    <Routes>
      <Route path=":transactionId" element={<AppContainer />}>
        <Route index element={<PaymentPage />} />
        <Route path="threeds" element={<ThreeDSPage />} />
        <Route path="success" element={<PaySuccessPage />} />
        <Route path="fail" element={<PayFailPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
