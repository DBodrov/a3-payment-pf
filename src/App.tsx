import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PaymentPage, NotFound, PaySuccessPage, PayFailPage} from '@/screens';

export function App() {
  return (
    <Routes>
      <Route path=":orderId" element={<PaymentPage />}>
        {/* <Route index element={<Checkout />} /> */}
        {/* <Route path="payment" element={<Payment />} /> */}
        {/* <Route path="card" element={<Card />} /> */}
        {/* <Route path="success" element={<PaySuccessPage />} /> */}
      </Route>
      <Route path="success" element={<PaySuccessPage />} />
      <Route path="fail" element={<PayFailPage />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="result" element={<PayResultPage />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
