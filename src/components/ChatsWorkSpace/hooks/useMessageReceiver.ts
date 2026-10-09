import {useApi} from '../../../api/provider.tsx';
import type {Message} from '../ChatsWorkSpace.types.tsx';
import {useEffect, useRef} from 'react';
import {mapNotificationToMessage} from './mapper.ts';

type UseMessageReceiverOptions = {
  onMessageReceived: (message: Message) => void;
};
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
export const useMessageReceiver = ({onMessageReceived}: UseMessageReceiverOptions) => {
  const api = useApi();
  const onMessageReceivedRef = useRef(onMessageReceived);
  
  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
  }, [onMessageReceived]);
  
  useEffect(() => {
    console.log('RECEIVER START');
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
          
          console.log('RECEIVED', {
            receiptId: notification.receiptId,
            idMessage: notification.body?.idMessage,
            chatId: notification.body?.senderData?.chatId,
          });

          const message = mapNotificationToMessage(notification);
          
          if (message) {
            onMessageReceivedRef.current(message);
          }

          const delRes = await api.deleteNotification(notification.receiptId);
          console.log('DELETED', {
            receiptId: notification.receiptId,
            delRes,
          });
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
