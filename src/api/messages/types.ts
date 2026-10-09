import type {BaseRequest} from '../types.ts';

export type SendMessageRequest = BaseRequest<{
  chatId: string;
  message: string;
}>;

export type SendMessageResponse = {
  idMessage: string;
}

export type ReceiveNotificationRequest = BaseRequest;
export type DeleteNotificationRequest = BaseRequest;

export type ReceiveNotificationResponse = {
  receiptId: number,
  body: {
    idMessage: string;
    typeWebhook: string,
    senderData: {
      chatId: string,
      sender: string,
      senderName: string
    },
    messageData: {
      typeMessage: string,
      textMessageData: {
        textMessage: string
      }
    }
  }
};

export type DeleteNotificationResponse = {
  result: boolean;
  reason: string;
}