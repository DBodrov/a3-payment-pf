import React from 'react';
import {usePayment} from '@/context';
import {createPaymentData} from './yandex-pay.utils';
import * as IYaPay from './yapay.types';

let yandexPayClient: IYaPay.Payment | null = null;

async function createYandexPayClient(order: IYaPay.Order) {
  if (yandexPayClient === null) {
    const YaPay = (window as any).YaPay;
    const paymentData = createPaymentData(order);
    const payment: IYaPay.Payment = await YaPay.createPayment(paymentData);
    yandexPayClient = payment;
  }
}

export async function getYaPayClient(order: IYaPay.Order) {
  if (yandexPayClient === null) {
    await createYandexPayClient(order);
  }
  return yandexPayClient;
}

export function useYaPay() {
  const {info, makePayment, setPaymentType} = usePayment();
  const YPButton = React.useRef<IYaPay.Button | null>(null);

  const readYaPayClient = React.useCallback(async () => {
    const order: IYaPay.Order = {
      id: info.transactionId || '0',
      total: {
        amount: String(info.totalAmount),
        label: info.description,
      },
      items: [{amount: String(info.totalAmount), label: info.description || ''}],
    };
    const client = await getYaPayClient(order);
    client?.on(IYaPay.PaymentEventType.Process, function onPaymentProcess(event) {
      makePayment({
        transactionId: info.transactionId,
        amount: info.amount,
        paymentType: 'YP',
        prId: info.prId,
        description: info.description,
        encodedToken: event.token,
      });
      client.complete(IYaPay.CompleteReason.Success);
      yandexPayClient = client;
    });
  }, [info.amount, info.description, info.prId, info.totalAmount, info.transactionId, makePayment]);

  const addYaPayButton = React.useCallback(
    async (container: HTMLElement) => {
      if (!yandexPayClient) {
        await readYaPayClient();
      }

      YPButton.current = yandexPayClient!.createButton({
        type: IYaPay.ButtonType.Simple,
        theme: IYaPay.ButtonTheme.WhiteOutlined,
        width: IYaPay.ButtonWidth.Max,
      });

      YPButton.current.on(IYaPay.ButtonEventType.Click, () => {
        setPaymentType('YP');
        yandexPayClient!.checkout();
      });
      YPButton.current.mount(container);
    },
    [readYaPayClient, setPaymentType],
  );

  const removeYaPayButton = React.useCallback(() => {
    YPButton.current?.destroy();
  }, []);

  return {
    addYaPayButton,
    removeYaPayButton,
  };
}
