type TClientConfig = {
  homeUrl?: string;
  logo?: string;
  companyName?: string;
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

export type PaymentFunction = (params: TPaymentParams) => void;
export type CardPaymentFunction = (cardPaymentParams: IPaymentData) => void;

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
  // isComplete: boolean;
  // isLoading: boolean;
  // isPaymentsAvailable: boolean;
  // showGooglePayButton: boolean;
  // googlePayStatus: 'idle' | 'loading' | 'success' | 'error' | 'started' | 'complete' | 'canceled';
  // addGooglePayButton: (container: HTMLElement) => void;
  // makeGooglePayment: PaymentFunction;
  // transactionResult?: 'THREE_DS' | 'SUCCESS' | 'FAIL';
  makeCardPayment: CardPaymentFunction;
  transactionStatus?: TTransactionStatus;
  transactionId?: string;
  // resetCardPayState: () => void;
  // uiMessage?: string;
  paReq?: string | null;
  cardSubmitting: boolean;
  cardSubmitted: boolean;
  info: IPFInfo;
};

export type TGooglePayState = {
  status: TPaymentContext['googlePayStatus'];
  showGooglePayButton: boolean;
};

// {
//   "payToken": {
//       "data": "",
//       "signature": "",
//       "version": "",
//       "header": {
//           "publicKeyHash": "",
//           "ephemeralPublicKey": "",
//           "transactionId": ""
//       }
//   },
//   "paymentType": "AP",
//   "transactionId": "",
//   "prId": 0
// }

// {
//   "payCard": {
//       "card": "",
//       "cvc2": "",
//       "expMonth": "",
//       "expYear": "",
//       "carHolder": "",
//       "email": ""
//   },
//   "amount": 0.0,
//   "description": "",
//   "paymentType": "CARD",
//   "transactionId": "",
//   "prId": 0
// }

// type TGooglePayData  = google.payments.api.PaymentData;

export interface IPaymentData {
  paymentType: 'AP' | 'GP' | 'CARD';
  transactionId?: string | null;
  prId: number;
  amount: number;
  description?: string;
  payToken?: any;
  payCard?: any;
}
