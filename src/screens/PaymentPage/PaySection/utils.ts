import type {TTransactionStatus} from '@/context/PaymentProvider/types';

const statuses = new Map<TTransactionStatus, 'success' | 'fail' | 'three_ds'>([
  ['DEBITED', 'success'],
  ['HOLD_ACCEPTED', 'success'],
  ['DEBIT_REFUSED', 'fail'],
  ['DEBIT_CHECK_ERROR', 'fail'],
  ['DEBIT_ERROR', 'fail'],
  ['DEBIT_IMPOSSIBLE', 'fail'],
  ['HOLD_ERROR', 'fail'],
  ['HOLD_3DS_TIMEOUT', 'fail'],
  ['HOLD_3DS_WAITING', 'three_ds']
]);

export function readTransactionStatus(transactionStatus?: TTransactionStatus) {
  if (!transactionStatus) return 'not_found';
  return statuses.get(transactionStatus)
}
