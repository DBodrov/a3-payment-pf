import React from 'react';
// import {Loader} from '@a3/frontkit';
import {PFInfoProvider, AppErrorBoundary} from '@/context';


// const AuthenticatedApp = React.lazy(() => import(/* webpackChunkName: "AuthApp" */ '../../AuthenticatedApp'));
// const UnauthenticatedApp = React.lazy(
//   () => import(/* webpackChunkName: "UnAuthApp" */ '../../UnauthenticatedApp'),
// );

export function PaymentPage() {
  return (
    <AppErrorBoundary>
      <PFInfoProvider>

          <h1>Payment page</h1>

      </PFInfoProvider>
    </AppErrorBoundary>
  );
}

// function Application() {
//   const {authToken} = useAuth();

//   return (
//     <React.Suspense fallback={<Loader />}>
//       {Boolean(authToken) ? <AuthenticatedApp /> : <UnauthenticatedApp />}
//     </React.Suspense>
//   );
// }
