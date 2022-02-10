import React from 'react';
import {usePFInfo, usePayment} from '@/context';
import {IPaymentData} from '@/context/PaymentProvider/types';
import {isEmptyString, onlyDigit} from '@/utils/string.utils';
import {requiredFieldValidator, ccnValidation, ccExpValidation, cscValidation} from './validation.utils';
import {TFormState, IFormChanges, initCCFormState, TFieldName} from './types';

const formStateReducer = (state: TFormState, changes: IFormChanges) => {
  switch (changes.type) {
    case 'ADD_ERROR': {
      return {
        ...state,
        error: {
          ...state.error,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
      };
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          [changes.fieldName]: changes.payload,
        },
        touched: {
          ...state.touched,
          [changes.fieldName]: true,
        },
        error: {
          ...state.error,
          [changes.fieldName]: '',
        },
      };
    }
    default:
      return state;
  }
};

const clearErrorAction = (fieldName: TFieldName): IFormChanges => ({
  type: 'ADD_ERROR',
  fieldName,
  payload: '',
});

export function useCCForm() {
  const [{error, touched, values}, dispatch] = React.useReducer(formStateReducer, initCCFormState);
  const {totalAmount, transactionId, description, prId} = usePFInfo();
  const {makeCardPayment} = usePayment();
  // const mutation = useMutation(paymentProcess, {useErrorBoundary: true});
  // const queryClient = useQueryClient();

  // const amount = Number(queryParams?.get('_SUM'));

  const validateRequiredField = React.useCallback(
    async (fieldName: TFieldName) => {
      const val = values[fieldName];
      try {
        await requiredFieldValidator(val);
        dispatch(clearErrorAction(fieldName));
        return true;
      } catch (error: any) {
        dispatch({type: 'ADD_ERROR', fieldName, payload: error.message});
        return false;
      }
    },
    [values],
  );

  const validateCCNField = React.useCallback(async () => {
    const value = values.ccNumber;
    try {
      await requiredFieldValidator(value);
      await ccnValidation(value);
      dispatch(clearErrorAction('ccNumber'));
      return true;
    } catch (error: any) {
      dispatch({type: 'ADD_ERROR', fieldName: 'ccNumber', payload: error.message});
      return false;
    }
  }, [values.ccNumber]);

  const validateCCExpField = React.useCallback(
    async (value?: string) => {
      const cardDate = value ?? values.ccExp;
      try {
        await requiredFieldValidator(cardDate);
        await ccExpValidation(cardDate);
        dispatch(clearErrorAction('ccExp'));
        return true;
      } catch (error: any) {
        dispatch({type: 'ADD_ERROR', fieldName: 'ccExp', payload: error.message});
        return false;
      }
    },
    [values.ccExp],
  );

  const validateCSCField = React.useCallback(async () => {
    const value = values.cvc;
    try {
      await cscValidation(value);
      dispatch(clearErrorAction('cvc'));
      return true;
    } catch (error: any) {
      dispatch({type: 'ADD_ERROR', fieldName: 'cvc', payload: error.message});
      return false;
    }
  }, [values.cvc]);

  const formIsValid = React.useCallback(() => {
    const isAllTouched = Object.values(touched).every(Boolean);
    const noErrors = Object.values(error).every(isEmptyString);
    return isAllTouched && noErrors && values.isAgree;
  }, [error, touched, values.isAgree]);

  //   {
  //     "payCard": {
  //         "card": "",
  //         "cvc2": "",
  //         "expMonth": "",
  //         "expYear": "",
  //         "carHolder": "",
  //         "email": ""
  //     },
  //     "amount": 0.0,
  //     "description": "",
  //     "paymentType": "CARD",
  //     "transactionId": "",
  //     "prId": 0
  // }

  // "paymentType": "CARD",
  //     "transactionId": "b2eeb847-f863-4186-852e-c79d5e722e41",
  //     "prId": 4241,
  //     "returnUrl": null,
  //     "payCard": {
  //         "card": "5547817050124672",
  //         "cvc2": null,
  //         "expMonth": "03",
  //         "expYear": "22",
  //         "cardHolder": null,
  //         "email": null,
  //         "backRef": null,
  //         "tavv": null,
  //         "extMpiEci": null
  //     },
  //     "amount": 349,
  //     "description": "Test"

  const submitCardForm = React.useCallback(() => {
    const {ccExp, ccName, ccNumber, cvc} = values;
    const [expMonth, expYear] = ccExp.split('/');
    const cardNumber = onlyDigit(ccNumber);
    const payCard = {
      card: cardNumber,
      cvc2: cvc,
      expMonth,
      expYear,
      cardHolder: ccName,
    };

    const paymentData: IPaymentData = {
      payCard,
      amount: totalAmount,
      description,
      paymentType: 'CARD',
      transactionId,
      prId,
      returnUrl: 'https://sbp-psb-dev.a-3.ru/psb/result'
      // returnUrl: `${window.location.origin}/v1/processing/result`,
    };

    makeCardPayment(paymentData);

    // mutation.mutate(paymentData, {
    //   onError: error => console.log('error', error),
    //   onSuccess: data => {
    //     console.log('success', data);
    //     queryClient.setQueryData('bankResponse', {bankRes: data.data});
    //   },
    // });

  }, [description, makeCardPayment, prId, totalAmount, transactionId, values]);

  return {
    validateCCNField,
    validateRequiredField,
    validateCCExpField,
    validateCSCField,
    values,
    error,
    touched,
    dispatch,
    formIsValid,
    submitCardForm,
  };
}
