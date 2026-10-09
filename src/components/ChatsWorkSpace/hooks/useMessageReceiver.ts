import {useApi} from '../../../api/provider.tsx';
import type {Message} from '../ChatsWorkSpace.types.tsx';
import {useEffect, useRef} from 'react';
import {mapNotificationToMessage} from './mapper.ts';
import {delay} from '../../../helpers/delay.ts';

type UseMessageReceiverOptions = {
  onMessageReceived: (message: Message) => void;
};

export const useMessageReceiver = ({onMessageReceived}: UseMessageReceiverOptions) => {
  const api = useApi();
  const onMessageReceivedRef = useRef(onMessageReceived);

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    let stopped = false;

    const receive = async () => {
      while (!stopped) {
        try {
          const notification = (await api.receiveNotification())?.data;

          if (stopped) {
            break;
          }

          if (!notification) {
            continue;
          }

          if (notification) {
            console.log('[Green-API notification]', notification.body?.typeWebhook, notification);
          }

          const message = mapNotificationToMessage(notification);

          if (message) {
            onMessageReceivedRef.current(message);
          }

          await api.deleteNotification(notification.receiptId);
          await delay(2000);
        } catch (error) {
          if (stopped) {
            break;
          }

          console.error('RECEIVER ERROR', error);

          await delay(2000);
        }
      }
    };

    void receive();

    return () => {
      console.log('RECEIVER STOP');
      stopped = true;
    };
  }, [api]);
};
