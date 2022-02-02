import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {LOCAL_STORAGE_KEYS} from '@/utils/externals';

export function PayResultPage() {

  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  const successKey = searchParams.keys();

  const result = searchParams.get('Success');
  const reasonCode = searchParams.get('ReasonCode')
  console.log('search', result, reasonCode);


  React.useEffect(() => {
    if (result === 'true') {
      const providerId = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDER_ID);
      const url = `../${providerId}/success`;
      console.log('NAV ', url);
      navigate(url, {replace: true});
    }
  }, [navigate, result]);

  return null;
}
