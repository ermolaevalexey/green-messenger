import type {Message} from '../ChatsWorkSpace.types.tsx';
import type {ReceiveNotificationResponse} from '../../../api/messages/types.ts';

export const mapNotificationToMessage = (
  notification: ReceiveNotificationResponse,
): Message | null => {
  const {body} = notification;
  
  if (body.typeWebhook !== 'incomingMessageReceived') {
    return null;
  }
  
  if (body.messageData.typeMessage !== 'textMessage') {
    return null;
  }
  
  return {
    id: String(notification.receiptId),
    chatId: body.senderData.chatId,
    text: body.messageData.textMessageData.textMessage,
    direction: 'incoming',
    timestamp: Date.now(),
  };
};