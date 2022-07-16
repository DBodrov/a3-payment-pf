import React from 'react';
import {useQuery} from 'react-query';
import {readConfig} from '@/api';
import {isProd} from '@/utils/env.utils';

export function useConfigQuery(contractorId: string) {
  const {data, ...queryConfigInfo} = useQuery(
    ['config', contractorId],
    () => readConfig(contractorId, isProd() ? 'production' : 'development'),
    {
      enabled: Boolean(contractorId),
      staleTime: Infinity,
      retry: false,
    },
  );

  const parseConfig = React.useCallback(() => {
    if (queryConfigInfo.isSuccess) {
      try {
        const cfg = JSON.parse(data.data)
        return cfg
      } catch (error) {
        return {}
      }
    }
  }, [data, queryConfigInfo.isSuccess])

  return {config: parseConfig()};
}
