export enum PaymentSystems {
  All = 'All',
  Mir = 'Mir',
  Visa = 'Visa',
  Maestro = 'Maestro',
  MasterCard = 'MasterCard',
}

export type TPaymentSystemProps = {
  system?: PaymentSystems;
};

export type TFormState = {
  readonly values: typeof initCCFormValues;
  readonly error: typeof initErrorState;
  readonly touched: typeof initTouchedState;
};

export const initCCFormValues = {
  ccNumber: '',
  ccName: '',
  ccExp: '',
  cvc: '',
};

export const initErrorState = {
  ccNumber: '',
  ccExp: '',
  cvc: '',
};

export const initTouchedState = {
  ccNumber: false,
  ccExp: false,
};

export const initCCFormState: TFormState = {
  values: initCCFormValues,
  error: initErrorState,
  touched: initTouchedState,
};

export type TFieldName = keyof TFormState['values'];

export type TChangesType = 'ADD_ERROR' | 'CHANGE_VALUE';
export interface IFormChanges {
  type: TChangesType;
  fieldName: TFieldName;
  payload: any;
}
