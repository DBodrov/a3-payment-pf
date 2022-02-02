import React from 'react';
import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';
import {useConfig} from '@/context';
import {H1, H2, Span, Button} from '@a3/frontkit';
import {Page, ViewCard} from '@/layouts';
import {getPaReq} from '@/api';
import {EmailForm} from './EmailForm';
import {Details, DetailCell, DetailBlock} from './styles';

export function Checkout() {
  const {config, queryParams} = useConfig();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const sum = Number(queryParams?.get('_SUM'));
  const amount = isFinite(sum)
    ? sum.toLocaleString('ru', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'symbol',
      })
    : '';
  const personalAccount = queryParams?.get('LS') ?? '';
  const get3DS = async () => {
    const htmlSrc = await getPaReq(1);
    const bankFrame = iframeRef.current;
    bankFrame?.setAttribute('srcdoc', htmlSrc.pareq);
  };

  return (
    <Page>
      <H1 css={{fontWeight: 'normal', marginBottom: '2rem'}}>Детали платежа</H1>
      <ViewCard>
        <H2
          css={{
            fontWeight: 'normal',
            borderBottom: '1px var(--color-primary) solid',
          }}>
          {config?.title}
        </H2>
        <Details>
          <DetailBlock>
            <DetailCell>
              <Span css={{fontSize: '1.2rem', fontWeight: 'bold'}}>Лицевой счет</Span>
              <Span>{personalAccount}</Span>
            </DetailCell>
            <DetailCell>
              <Span css={{fontSize: '1.2rem', fontWeight: 'bold'}}>Адрес</Span>
              <Span>{queryParams?.get('ADDRESS')}</Span>
            </DetailCell>
          </DetailBlock>
          <DetailBlock css={{flex: '30%', height: '100%'}}>
            <DetailCell>
              <Span css={{fontSize: '2rem', margin: 'auto'}}>{amount}</Span>
            </DetailCell>
          </DetailBlock>
        </Details>
        <EmailForm />
      </ViewCard>
    </Page>
  );
}
