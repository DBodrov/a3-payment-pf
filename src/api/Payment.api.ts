import type {TTransactionStatus} from '@/context/PaymentProvider/types';
import {apiClient, IRequestConfig} from './api-client';


export type TPaymentResponse = {
  code: number;
  data: {
    channel?: number;
    paReq?: string | null;
    result?: "THREE_DS" | "SUCCESS" | "FAIL";
    transactionId?: string;
    transactionStatus?: TTransactionStatus;
  }
}

export async function paymentProcess(paymentData: any, options?: IRequestConfig): Promise<TPaymentResponse> {
  try {
    const response = await apiClient('/v1/processing/pay', {
      body: paymentData,
      redirect: 'follow',
    });
    return response;
  } catch (error) {
    throw new Response('Payment process error', {status: 400, statusText: 'Payment error'});
  }
}


export async function getPaymentStatus(transactionId: string): Promise<TPaymentResponse> {
  try {
    const response = await apiClient(`/v1/processing/pay?transactionId=${transactionId}`);
    return response;
  } catch (error) {
    throw new Response('Payment status', {status: 400, statusText: 'Payment status error'});
  }
}
