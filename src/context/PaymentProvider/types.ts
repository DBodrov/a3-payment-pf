export type TPaymentParams = {
  amount: number;
};

export type PaymentFunction = (params: TPaymentParams) => void;
export type CardPaymentFunction = (cardPaymentParams: any) => void;

export type TBaseCardPaymentMethod = {
  type: google.payments.api.PaymentMethodType;
  parameters: google.payments.api.CardParameters;
};

export type TPaymentContext = {
  isComplete: boolean;
  isLoading: boolean;
  isPaymentsAvailable: boolean;
  showGooglePayButton: boolean;
  googlePayStatus: 'idle' | 'loading' | 'success' | 'error' | 'started' | 'complete' | 'canceled';
  addGooglePayButton: (container: HTMLElement) => void;
  makeGooglePayment: PaymentFunction;
  makeCardPayment: CardPaymentFunction;
  transactionResult: '' | 'THREE_DS' | 'SUCCESS' | 'FAIL';
  uiMessage?: string;
  paReq: string;
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
  returnUrl: string;
  payToken?: any;
  payCard?: any;
}
