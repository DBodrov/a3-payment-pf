import type {TClientInfo} from './use-client-info';

type TLayoutConfig = {
  paymentSystemOrder: ['card', 'internet'];
}

type TClientConfig = {
  homeUrl?: string;
  logo?: string;
  companyName?: string;
  layout?: TLayoutConfig
};
export interface IPFInfo {
  config: TClientConfig;
  transactionId?: string;
  description?: string;
  amount: number;
  fee: number;
  totalAmount: number;
  prId: number;
}

export type TPaymentParams = {
  amount: number;
};

export type PaymentFunction = (params: IPaymentData) => void;

export type TBaseCardPaymentMethod = {
  type: google.payments.api.PaymentMethodType;
  parameters: google.payments.api.CardParameters;
};

export type TTransactionStatus =
  | 'DEBIT_ACCEPTED'
  | 'DEBIT_SENT'
  | 'DEBIT_RETRY'
  | 'DEBITED'
  | 'DEBIT_REFUSED'
  | 'DEBIT_ERROR'
  | 'DEBIT_IMPOSSIBLE'
  | 'HOLD_3DS_WAITING'
  | 'HOLD_3DS_TIMEOUT'
  | 'HOLD_ACCEPTED'
  | 'HOLD_3DS_WAITING'
  | 'DEBIT_CHECKING'
  | 'DEBIT_CHECK_ERROR'
  | 'DEBIT_3DS_WAITING'
  | 'HOLD_CANCEL'
  | 'HOLD_ERROR'
  | 'CANCEL_ACCEPTED'
  | 'CANCEL_HOLD'
  | 'CANCEL_SENT'
  | 'CANCELED'
  | 'NOT_CANCELED'
  | 'CANCEL_IMPOSSIBLE'
  | 'CANCEL_ERROR';

export type TPaymentContext = {
  makePayment: PaymentFunction;
  transactionStatus?: TTransactionStatus;
  paReq?: string | null;
  isSubmitting: boolean;
  isSubmitted: boolean;
  info: IPFInfo;
  clientInfo?: TClientInfo;
  paymentType: TPaymentType | null;
  setPaymentType: (paymentType: TPaymentType) => void;
};

export type TPaymentType = 'AP' | 'GP' | 'CARD' | 'YP'

export interface IPaymentData {
  paymentType: TPaymentType;
  transactionId?: string | null;
  prId: number;
  amount: number;
  description?: string;
  encodedToken?: any;
  payCard?: any;
}
