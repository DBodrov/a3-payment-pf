import React from 'react';
import {css} from '@emotion/react';
import {Button, Loader} from '@a3/frontkit';
import {usePayment} from '@/context';
import {CCNumberInput, CCNameInput, CCExpInput, CSCCodeInput} from './components';
import {useCCForm} from './use-ccform';
import {Form, FormField, Label} from './styles';
import {TFieldName} from './types';

export function CCForm() {
  const {
    validateCCNField,
    validateCCExpField,
    validateCSCField,
    values,
    error,
    dispatch,
    formIsValid,
    submitCardForm,
  } = useCCForm();
  const {isSubmitting, paymentType} = usePayment();
  const cardSubmitting = paymentType === 'CARD' && isSubmitting;

  const ccNumberRef = React.useRef<HTMLInputElement>(null);
  const cscCodeRef = React.useRef<HTMLInputElement>(null);

  const handleChangeCCN = (value: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'ccNumber', payload: value});
  };

  const handleChangeCardholder = (value: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'ccName', payload: value});
  };

  const handleChangeCCExp = (value: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'ccExp', payload: value});
  };

  const handleChangeCSC = (value: string) => {
    dispatch({type: 'CHANGE_VALUE', fieldName: 'cvc', payload: value});
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCardForm();
  };

  const hasError = (fieldName: Exclude<TFieldName, 'ccName'>) => {
    return Boolean(error[fieldName]);
  };

  const applyBorderStyle = (field: Exclude<TFieldName, 'ccName'>) =>
    css({
      border: `1px ${hasError(field) ? 'var(--color-error)' : 'var(--color-border)'} solid`,
      '&:hover, &:focus': {
        borderColor: hasError(field) ? 'var(--color-error)' : 'var(--color-primary)',
      },
    });

  return (
    <Form onSubmit={handlePaymentSubmit}>
      <FormField>
        <Label htmlFor="ccNumber">Номер карты</Label>
        <CCNumberInput
          id="ccNumber"
          ref={ccNumberRef}
          css={[applyBorderStyle('ccNumber')]}
          onChange={handleChangeCCN}
          value={values.ccNumber}
          onBlur={() => validateCCNField()}
        />
      </FormField>
      <div css={{display: 'flex', flexFlow: 'row nowrap', gap: 8, width: '100%'}}>
        <FormField css={{width: '60%'}}>
          <Label htmlFor="ccExp">Действительна до</Label>
          <CCExpInput
            id="ccExp"
            css={applyBorderStyle('ccExp')}
            onChange={handleChangeCCExp}
            value={values.ccExp}
            onBlur={() => validateCCExpField()}
          />
        </FormField>
        <FormField css={{width: '40%'}}>
          <Label htmlFor="cvc">Код</Label>
          <CSCCodeInput
            id="cvc"
            ref={cscCodeRef}
            css={applyBorderStyle('cvc')}
            onChange={handleChangeCSC}
            value={values.cvc}
            onBlur={() => validateCSCField()}
          />
        </FormField>
      </div>
      <FormField>
        <Label htmlFor="ccName">Владелец карты</Label>
        <CCNameInput id="ccName" onChange={handleChangeCardholder} value={values.ccName} />
      </FormField>
      <FormField css={{alignItems: 'center', marginBottom: 0}}>
        <Button
          type="submit"
          css={{height: '3rem', width: '100%', justifyContent: cardSubmitting ? 'flex-start' : 'center', borderRadius: 12}}
          variant="primary"
          disabled={!formIsValid() || cardSubmitting}>
          {cardSubmitting ? (
            <>
              <Loader css={{width: '100%', height: '100%'}} />
            </>
          ) : (
            'Оплатить'
          )}
        </Button>
      </FormField>

      {/* <PaymentSystem system={getPaymentSystem(values.ccNumber)} /> */}
    </Form>
  );
}
