import React from 'react';
import {css} from '@emotion/react';
import {InputPhone} from '@a3/frontkit';
import {PhoneIcon, InfoIcon} from '@/assets/icons';
import {InfoButton} from './styles';

type Props = {
  onChange: (phone: string) => void;
  phone?: string;
};

export function PhoneField({onChange, phone}: Props) {
  const [infoIsOpen, setInfoIsOpen] = React.useState(false);
  const infoPopupRef = React.useRef<HTMLElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && infoIsOpen) {
        if (infoPopupRef?.current?.contains(e.target)) {
          return;
        }
        setInfoIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [infoIsOpen]);

  React.useInsertionEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <div css={{width: '100%', position: 'relative'}}>
      <PhoneIcon css={{position: 'absolute', top: 10, left: 18, width: 18, height: 18, zIndex: 1}} />
      <InputPhone
        id="phone-number"
        ref={inputRef}
        onChange={onChange}
        value={phone}
        countryCode="+7"
        autoComplete="off"
        placeholder="(___) ___-__-__"
        countryCodeCSS={css({width: 70, paddingLeft: 40})}
        css={{
          height: 40,
          paddingLeft: 60,
          borderRadius: 12,
          backgroundColor: 'var(--color-background-secondary)',
          letterSpacing: 2,
        }}
      />

      <InfoButton
        type="button"
        onClick={() => {
          setInfoIsOpen(!infoIsOpen);
        }}>
        <InfoIcon />
      </InfoButton>
      {infoIsOpen ? (
        <article
          css={{
            position: 'absolute',
            top: 45,
            left: 0,
            backgroundColor: 'var(--color-background)',
            padding: '1rem',
            boxShadow: '0px 3px 36px rgba(8, 33, 99, 0.15)',
            borderRadius: 12,
            zIndex: 1,
          }}
          ref={infoPopupRef}>
          <span>
            Необходимо указать ваш действующий номер телефона, по которому, можно будет связаться для решения
            вопросов, связанных с оплатой. Укажите e-mail, на который хотели бы получать квитанции об оплате
          </span>
        </article>
      ) : null}
    </div>
  );
}
