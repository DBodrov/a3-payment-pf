import {apiClient} from './api-client';

export async function readPaymentInfo(transactionId: string) {
  const url = `/v1/processing/info/${transactionId}`;
  try {
    const response = await apiClient(url);
    if ('code' in response && response.code !== 200) {
      throw new Response(response.message, {status: response.code});
    }
    return response;
  } catch (error: any) {
    throw new Response('Payment info error', {
      status: error.status,
      statusText: 'Error in readPaymentInfo()',
    });
  }
}
