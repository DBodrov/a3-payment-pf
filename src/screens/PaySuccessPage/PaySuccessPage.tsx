import React from 'react';
import {H1} from '@a3/frontkit';
import {StyledPage, StatusBlock} from './styles';

export function PaySuccessPage() {
  return (
    <StyledPage>
      <StatusBlock>
        <H1>Оплата прошла успешно</H1>
      </StatusBlock>
    </StyledPage>
  );
}
