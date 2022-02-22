import {apiClient} from './api-client';

export async function readPaymentInfo(transactionId: string) {
  const url = `/v1/processing/info/${transactionId}`;
  try {
    const response = await apiClient(url);
    return response;
  } catch (error: any) {
    throw new Response('Payment info error', {
      status: error.status,
      statusText: 'Error in readPaymentInfo()',
    });
  }
}
