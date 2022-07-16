import React from 'react';
import {usePayment} from '../PaymentProvider';
import {useConfigQuery} from './use-config-query';

const ConfigContext = React.createContext(undefined);
ConfigContext.displayName = "ConfigContext";

type Props = {
  children: React.ReactNode;
}
export function ConfigProvider({children}: Props) {
  const {info: {prId}} = usePayment();
  const {config} = useConfigQuery(String(prId))
  console.log(config)

  const ctx = React.useMemo(() => config, [config]);

  return <ConfigContext.Provider value={ctx}>
    {children}
  </ConfigContext.Provider>
}

export function useConfig() {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
