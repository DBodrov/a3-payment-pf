import React from 'react';
import {H1, H3} from '@a3/frontkit';
import {Page, ViewCard} from '@/layouts';


export function PaySuccessPage() {



  // React.useEffect(() => {
  //   localStorage.clear();
  // }, [])

  return (
    <Page>
      <H1>Оплата выполнена</H1>
      <ViewCard>
        <H3>Покупайте наших слонов!</H3>

      </ViewCard>
    </Page>
  )
}
