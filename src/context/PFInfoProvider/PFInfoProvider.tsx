import React from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from '@a3/frontkit';
import {NotFound} from '@/screens';
// import {applyCSSVariables} from '@/utils/styles.utils';
import {usePFInfoClient} from './use-pfinfo-client';
import {IPFInfoContext, IPFInfo} from './types';

const PFInfoContext = React.createContext<IPFInfoContext | undefined>(undefined);
PFInfoContext.displayName = 'PFInfoContext';

type Props = {children: React.ReactNode};

export function PFInfoProvider({children}: Props) {
  const {orderId = ''} = useParams<string>();
  const {data: pfInfo, status, isSuccess} = usePFInfoClient(orderId);
  const info = pfInfo?.data as IPFInfo;


  const configContext = React.useMemo<IPFInfoContext>(
    () => ({...info}),
    [info],
  );

  // if (data?.theme) {
  //   applyCSSVariables(data.theme);
  // }

  if (status === 'loading' || status === 'idle') {
    return (
      <Loader fullscreen>
        <span>Загрузка...</span>
      </Loader>
    );
  }

  if (isSuccess) {
    return <PFInfoContext.Provider value={configContext}>{children}</PFInfoContext.Provider>;
  }

  return <NotFound />;
}

export function usePFInfo() {
  const context = React.useContext(PFInfoContext);
  if (!context) {
    throw new Error('usePFInfo must be used within a PFInfoProvider');
  }
  return context;
}
