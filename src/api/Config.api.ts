import {apiClient} from './api-client';

export async function readConfig(contractorId: string, key: string) {
  const url = `/api/v1/contractor/front/configuration/${contractorId}/${key}`;
  try {
    const response = await apiClient(url);
    if ('code' in response && response.code !== 200) {
      throw new Response(response.message, {status: response.code});
    }
    return response;
  } catch (error: any) {
    throw new Response('Config error', {
      status: error.status,
      statusText: 'Error in readConfig()',
    });
  }
}
