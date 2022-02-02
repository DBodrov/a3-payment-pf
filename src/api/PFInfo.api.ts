import {apiClient} from './api-client';

export async function readPFInfo(orderId: string) {
  const url = `/v1/processing/info/${orderId}`;
  try {
    const response = await apiClient(url);
    return response;
  } catch (error: any) {
    throw new Response('PFInfo error', {
      status: error.status,
      statusText: 'Error in readPFInfo()',
    });
  }
}
