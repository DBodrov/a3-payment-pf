import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Input, Button} from '@a3/frontkit';
import {useConfig} from '@/context';
import {isEmail} from '@/utils/string.utils';
import {Form} from './styles';

export function EmailForm() {
  const [validationState, setValidation] = React.useState({isTouched: false, isValid: false});
  const {setClientInfo} = useConfig();
  const hasError = validationState.isTouched && !validationState.isValid;
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const isValidEmail = isEmail(email as string);
    if (!isValidEmail) {
      setValidation({isTouched: true, isValid: false});
      return;
    }
    setValidation({isTouched: true, isValid: true});
    setClientInfo({email: email as string})

    navigate('../payment')
  };

  return (
    <Form onSubmit={handleEmailSubmit}>
      <label htmlFor="email" css={{color: 'var(--color-text-secondary)', width: '100%'}}>
        Укажите email, мы пришлем кассовый чек
        <Input
          css={{marginTop: 8, borderColor: hasError ? 'var(--color-error) !important' : 'var(--color-border)'}}
          type="email"
          id="email"
          name="email"
          placeholder="Введите email"
        />
        {hasError ? (
          <em role="alert" css={{color: 'var(--color-error)', fontSize: 12}}>
            Введите адрес электронной почты
          </em>
        ) : null}
      </label>
      <section css={{display: 'flex', width: '100%', padding: '1rem 0'}}>
        <Button css={{margin: 'auto', width: 250}} type="submit">
          Оплата
        </Button>
      </section>
    </Form>
  );
}
