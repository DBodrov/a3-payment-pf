import React from 'react';
import {H1} from '@a3/frontkit';
import {StyledPage, StatusBlock} from './styles';

export function PayFailPage() {
  return (
    <StyledPage>
      <StatusBlock>
        <H1>Оплата не прошла</H1>
      </StatusBlock>
    </StyledPage>
  );
}
