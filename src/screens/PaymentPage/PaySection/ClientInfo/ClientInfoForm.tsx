import React from 'react';
import {Checkbox} from '@a3/frontkit';
import {usePayment} from '@/context';
import {PhoneField} from './PhoneField';
import {EmailField} from './EmailField';
import {Form, Label, FormField} from './styles';

export function ClientInfoForm() {
  const {clientInfo, isSubmitted} = usePayment();
  const {phone, handleChangePhone, isAgree, handleChangeAgreement, email, handleChangeEmail, resetForm} = clientInfo!;

  const changeAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeAgreement(e.currentTarget.checked);
  };

  React.useEffect(() => {
    if (isSubmitted) {
      resetForm();
    }
  }, [isSubmitted, resetForm])

  return (
    <Form>
      <FormField>
        <Label htmlFor='phone-number'>Номер мобильного телефона</Label>
        <PhoneField onChange={handleChangePhone} phone={phone} />
      </FormField>
      <FormField>
        <Label htmlFor='email'>Адрес электронной почты</Label>
        <EmailField onChange={handleChangeEmail} email={email} />
      </FormField>
      <FormField>
        <Checkbox name="termsAgreement" checked={isAgree} onChange={changeAgreement}>
          <span>
            Я соглашаюсь с условиями{' '}
            <a
              href="http://a-3.ru/somepdf.pdf"
              css={{color: 'var(--color-primary)'}}
              target="_blank"
              rel="noopener noreferrer">
              оферты
            </a>
          </span>
        </Checkbox>
      </FormField>
    </Form>
  );
}
