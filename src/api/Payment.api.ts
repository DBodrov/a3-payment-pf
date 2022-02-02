import {apiClient, IRequestConfig} from './api-client';

export async function getPaReq(transactionId: number) {
  try {
    const response = await apiClient('/api/pareq', {body: {transactionId}});
    return response;
  } catch (error) {}
}

export async function paymentProcess(paymentData: any, options?: IRequestConfig) {
  try {
    const response = await apiClient('/v1/processing/pay', {
      body: paymentData,
      redirect: 'follow',
    });
    return response;
  } catch (error) {
    console.error('pay error catch', error);
    throw new Response('Payment process error', {status: 400, statusText: 'Payment error'});
  }
}

// export async function cardPaymentProcess(paymentData: any, options?: IRequestConfig) {
//   try {
//     const response = await apiClient('/.netlify/functions/cardPaymentProcess', {
//       body: paymentData,
//       token: options?.token,
//       redirect: 'follow',
//     });
//     return response;
//   } catch (error) {
//     console.error('pay error catch', error);
//     throw new Response('Payment process error', {status: 400, statusText: 'Payment error'});
//   }
// }

// export async function clientEmailSubmit(email: string, options?: IRequestConfig) {
//   try {
//     const response = await apiClient('/.netlify/functions/emailSubmit', {
//       body: {email},
//       token: options?.token,
//     });
//   } catch (error) {}
// }
