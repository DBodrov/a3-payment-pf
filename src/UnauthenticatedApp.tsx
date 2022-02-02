import React from 'react';
import {Unauthorized} from '@/screens/ErrorFallback'

export default function UnauthenticatedApp() {
  const error = new Response('Требуется авторизация', {status: 401, statusText: 'Not authorized'});
  return <Unauthorized error={error} resetErrorBoundary={() => {}}/>
}
