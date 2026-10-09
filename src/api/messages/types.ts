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

export type GetMessageRequest = BaseRequest<{
  chatId: string;
  idMessage: string;
}>;

export type GetMessageResponse = {
  "type": 'outgoing' | 'incoming';
  "idMessage": string;
  "timestamp": number;
  "typeMessage": string;
  "chatId": string;
  "chatType": 'user' | 'group' | 'supergroup' | 'channel' | 'bot';
  "textMessage": string;
  isForwarded: boolean;
  forwardingScore: number;
  statusMessage: 'delivered' | 'read';
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
}