import {PaymentSystems} from './types';

export const paymentSystems = [
  {
    paymentSystem: PaymentSystems.Mir,
    numbers: ['2'],
  },
  {
    paymentSystem: PaymentSystems.Visa,
    numbers: ['4'],
  },
  {
    paymentSystem: PaymentSystems.Maestro,
    numbers: ['50', '56', '57', '58', '63', '67'],
  },
  {
    paymentSystem: PaymentSystems.MasterCard,
    numbers: ['51', '52', '53', '54', '55'],
  },
];

export const getPaymentSystem = (ccn: string) => {
  let prefix: string;
  if (ccn.startsWith('5') || ccn.startsWith('6')) {
    prefix = ccn.slice(0, 2);
  } else {
    prefix = ccn.slice(0, 1);
  }
  const system = paymentSystems.find(s => s.numbers.includes(prefix))?.paymentSystem;
  return system;
};

export function NotNull(value: unknown): boolean {
  return value !== null;
}
