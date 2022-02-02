import {useQuery} from 'react-query';
import {checkToken} from '@/api';
import {LOCAL_STORAGE_KEYS} from '@/utils/externals';

const tokenStaleTime = 1000 * 60 * 60;
export function useLogin(jwt?: string) {
  return useQuery(['token'], () => checkToken(jwt!), {
    enabled: Boolean(jwt),
    useErrorBoundary: true,
    staleTime: tokenStaleTime,
    onError: () => localStorage.removeItem(LOCAL_STORAGE_KEYS.QUERY),
  });
}
