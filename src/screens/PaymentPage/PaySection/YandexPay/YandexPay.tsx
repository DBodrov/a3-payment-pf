import React from 'react';
import {usePayment} from '@/context';
import {getYaPayClient} from './use-yapay';
import * as IYaPay from './yapay.types';
import {useScript} from '@/utils/use-script';


export function YandexPay() {
  const {isSuccess: yaPayIsLoaded} = useScript('https://pay.yandex.ru/sdk/v1/pay.js');
  const {info, clientInfo, makePayment, isSubmitting, isSubmitted} = usePayment();
  const yaPayContainerRef = React.useRef<HTMLElement | null>(null);
  const isMountButton = React.useRef(false);
  const [token, setToken] = React.useState<string | null>(null);

  const YPButton = React.useRef<IYaPay.Button | null>(null);

  const validateClientInfo = React.useCallback(() => {
    return clientInfo?.isAgree && !(isSubmitting || isSubmitted);
  }, [clientInfo?.isAgree, isSubmitted, isSubmitting]);

  const order = React.useMemo<IYaPay.Order>(() => ({
    id: info.transactionId || '0',
    total: {
      amount: String(info.totalAmount),
      label: info.description,
    },
    items: [{amount: String(info.totalAmount), label: info.description || ''}],
  }), [info.description, info.totalAmount, info.transactionId]);

  const readYaPayClient = React.useCallback(async () => {
    const client = await getYaPayClient(order);
    client?.on(IYaPay.PaymentEventType.Process, function onPaymentProcess(event) {
      setToken(event.token);
      client.complete(IYaPay.CompleteReason.Success);
    });
    return client;
  }, [order]);

  const addYaPayButton = React.useCallback(async () => {
    const client = await readYaPayClient();
    if (client) {
      YPButton.current = client.createButton({
        type: IYaPay.ButtonType.Simple,
        theme: IYaPay.ButtonTheme.WhiteOutlined,
        width: IYaPay.ButtonWidth.Max,
      });

      YPButton.current.on(IYaPay.ButtonEventType.Click, () => {
        const isValidClientInfo = validateClientInfo();
        if (!isValidClientInfo) {
          return;
        }
        client.checkout();
      });
      YPButton.current.mount(yaPayContainerRef.current!);
    }
  }, [readYaPayClient, validateClientInfo]);

  const startPaymentProcess = React.useCallback(() => {
    makePayment({
      transactionId: info.transactionId,
      amount: info.amount,
      paymentType: 'YP',
      prId: info.prId,
      description: info.description,
      encodedToken: token,
    });
  }, [info.amount, info.description, info.prId, info.transactionId, makePayment, token]);

  React.useEffect(() => {
    const addBtn = async () => {
      if (isMountButton.current) return;
      await addYaPayButton();
      isMountButton.current = true;
    };

    if (yaPayIsLoaded && !isMountButton.current) {
      addBtn();
    }
    if (token && !(isSubmitting || isSubmitted)) {
      startPaymentProcess();
    }

    return () => {
      isMountButton.current = false;
      YPButton.current?.destroy();
    };
  }, [
    addYaPayButton,
    info.amount,
    info.description,
    info.prId,
    info.transactionId,
    isSubmitted,
    isSubmitting,
    makePayment,
    startPaymentProcess,
    token,
    yaPayIsLoaded,
  ]);

  return (
    <section
      id="ya-pay-section"
      ref={yaPayContainerRef}
      css={{
        width: '100%',
        minHeight: '3rem',
        height: 40,
      }}></section>
  );
}
