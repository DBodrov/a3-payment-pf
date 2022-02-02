import React from 'react';
import {H1, H3} from '@a3/frontkit';
import {Page, ViewCard} from '@/layouts';
import {useConfig} from '@/context';

export function PaySuccessPage() {
  const {queryParams} = useConfig();
  const LK_URL = queryParams?.get('url') || '/';

  React.useEffect(() => {
    localStorage.clear();
  }, [])

  return (
    <Page>
      <H1>Оплата выполнена</H1>
      <ViewCard>
        <H3>Покупайте наших слонов!</H3>
        <a href={LK_URL}>Вернуться откуда явились</a>
      </ViewCard>
    </Page>
  )
}
