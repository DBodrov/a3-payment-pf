import React from 'react';
import {Loader} from '@a3/frontkit';
import {usePFInfo} from '../PFInfoProvider';
import {useLogin} from './use-auth-client';

interface IAuthContext {
  authToken?: string;
}
const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

type Props = {children: React.ReactNode};

export function AuthProvider({children}: Props) {
  const {} = usePFInfo();
  const jwt = queryParams?.get('jwt');
  const {data: token, status, isStale} = useLogin(jwt);

  const authCtx = React.useMemo<IAuthContext>(
    () => ({authToken: token}),
    [token],
  );

  if (Boolean(jwt) && (status === 'idle' || status === 'loading')) {
    return (
      <Loader fullscreen>
        <span>Авторизация...</span>
      </Loader>
    );
  }

  if (Boolean(token) && isStale) {
    throw new Response('Auth token expired', {status: 419, statusText: 'Auth token expired'});
  }

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
