import {useSearchParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {readPFInfo} from '@/api';
import {LOCAL_STORAGE_KEYS} from '@/utils/externals';
import {TQueryParams} from './types';

export function usePFInfoClient(orderId: string) {
  return useQuery(['info', orderId], () => readPFInfo(orderId), {
    enabled: Boolean(orderId),
    staleTime: Infinity,
    retry: false,
    useErrorBoundary: true,
    onSuccess: () => {localStorage.setItem(LOCAL_STORAGE_KEYS.ORDER_ID, orderId)}
  });
}


// export function useSearchQueryParams(search?: string): TQueryParams {
//   const storedQuery = localStorage.getItem(LOCAL_STORAGE_KEYS.QUERY) || '';

//   const initSearchParams = search ? search : storedQuery;
//   const searchParams = useSearchParams(initSearchParams)[0];
//   console.log('search params ', Array.from(searchParams.entries()).length)
//   if (Array.from(searchParams.entries()).length > 0) {
//     console.log('store query')
//     localStorage.setItem(LOCAL_STORAGE_KEYS.QUERY, searchParams.toString());
//   }

//   const queryParams = new Map(searchParams.entries());

//   return queryParams as TQueryParams;
// }
