import React from 'react';
import {css} from '@emotion/react';
import {Checkbox, Button, Loader} from '@a3/frontkit';
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
  const {cardSubmitting} = usePayment();
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

  const handleChangeAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    dispatch({type: 'CHANGE_VALUE', fieldName: 'isAgree', payload: value});
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCardForm();
  };

  const hasError = (fieldName: Exclude<TFieldName, 'isAgree' | 'ccName'>) => {
    return Boolean(error[fieldName]);
  };

  const applyBorderStyle = (field: Exclude<TFieldName, 'isAgree' | 'ccName'>) =>
    css({
      border: `1px ${hasError(field) ? 'var(--color-error)' : 'var(--color-border)'} solid`,
      '&:hover, &:focus': {
        borderColor: hasError(field) ? 'var(--color-error)' : 'var(--color-primary)',
      },
    });

  React.useEffect(() => {
    ccNumberRef?.current?.focus();
  }, []);

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
      <FormField>
        <Checkbox name="termsAgreement" checked={values.isAgree} onChange={handleChangeAgreement}>
          <span>
            Я подтверждаю свое согласие с{' '}
            <a
              href="http://a-3.ru/somepdf.pdf"
              css={{color: 'var(--color-primary)'}}
              target="_blank"
              rel="noopener noreferrer">
              правилами оказания услуг
            </a>
          </span>
        </Checkbox>
      </FormField>
      <FormField css={{alignItems: 'center'}}>
        <Button
          type="submit"
          css={{height: '3rem', width: 250, justifyContent: cardSubmitting ? 'flex-start' : 'center'}}
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

      <section
        css={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px 0',
        }}></section>
    </Form>
  );
}
