import React from 'react';
import {css} from '@emotion/react';
import {Checkbox, Button} from '@a3/frontkit';
import {PaymentSystem} from './PaymentLogos';
import {CCNumberInput, CCNameInput, CCExpInput, CSCCodeInput} from './components';
import {useCCForm} from './use-ccform';
import {getPaymentSystem} from './utils';
import {Form, FrontCard, BackCard, CSCField, CardsGroup, FieldGroup} from './styles';
import {TFieldName} from './types';

export function CCForm() {
  const {
    validateCCNField,
    validateCCExpField,
    validateCSCField,
    validateRequiredField,
    values,
    error,
    dispatch,
    formIsValid,
    submitCardForm
  } = useCCForm();
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
    submitCardForm()
  };

  const hasError = (fieldName: Exclude<TFieldName, 'isAgree'>) => {
    return Boolean(error[fieldName]);
  };

  const applyBorderStyle = (field: Exclude<TFieldName, 'isAgree'>) =>
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
      <CardsGroup>
        <FrontCard>
          <PaymentSystem system={getPaymentSystem(values.ccNumber)} />
          <CCNumberInput
            ref={ccNumberRef}
            css={[{marginTop: 'auto'}, applyBorderStyle('ccNumber')]}
            onChange={handleChangeCCN}
            value={values.ccNumber}
            onBlur={() => validateCCNField()}
          />
          <div css={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
            <CCNameInput
              css={applyBorderStyle('ccName')}
              onChange={handleChangeCardholder}
              value={values.ccName}
              onBlur={() => validateRequiredField('ccName')}
            />
            <CCExpInput
              css={applyBorderStyle('ccExp')}
              onChange={handleChangeCCExp}
              value={values.ccExp}
              onBlur={() => validateCCExpField()}
            />
          </div>
        </FrontCard>
        <BackCard>
          <div css={{width: '100%', height: 68, backgroundColor: '#EAEEF4'}}></div>
          <CSCField>
            <CSCCodeInput
              ref={cscCodeRef}
              css={[{width: 150, marginLeft: 'auto'}, applyBorderStyle('cvc')]}
              onChange={handleChangeCSC}
              value={values.cvc}
              onBlur={() => validateCSCField()}
            />
            <span css={{width: 150, marginLeft: 'auto', fontSize: '.75rem', paddingTop: 15}}>
              Последние 3 цифры на оборотной стороне карты
            </span>
          </CSCField>
        </BackCard>
      </CardsGroup>
      <section
        css={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px 0',
        }}>
        <FieldGroup>
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
        </FieldGroup>
        <Button
          type="submit"
          css={{height: '3rem', '@media (max-width: 425px)': {width: '98%'}, width: '80%'}}
          variant="primary"
          disabled={!formIsValid()}>
          Оплатить
        </Button>
      </section>
    </Form>
  );
}
