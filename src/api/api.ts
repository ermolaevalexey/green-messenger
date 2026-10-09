import type {Credentials} from './types.ts';
import {getAccountSettings} from './account/getAccountSettings.ts';
import {checkRecipientAccount} from './account/checkRecipientAccount.ts';
import {getContactInfo} from './account/getContactInfo.ts';
import {sendMessage} from './messages/sendMessage.ts';
import {receiveNotification} from './messages/receiveNotification.ts';
import {deleteNotification} from './messages/deleteNotification.ts';
import {getMessage} from './messages/getMessage.ts';

export const createApi = ({idInstance, apiTokenInstance}: Credentials) => ({
  getAccountSettings: () => getAccountSettings({idInstance, apiTokenInstance}),
  checkRecipientAccount: (phoneNumber: string) =>
    checkRecipientAccount({
      idInstance,
      apiTokenInstance,
      body: {
        phoneNumber: Number(phoneNumber)
      },
    }),
  getContactInfo: (chatId: string) => getContactInfo({
    idInstance,
    apiTokenInstance,
    body: {
      chatId
    }
  }),
  sendMessage: (chatId: string, message: string) => sendMessage({
    idInstance,
    apiTokenInstance,
    body: {
      chatId,
      message
    }
  }),
  getMessage: (chatId: string, idMessage: string) => getMessage({
    idInstance,
    apiTokenInstance,
    body: {
      chatId,
      idMessage
    }
  }),
  receiveNotification: () => receiveNotification({idInstance, apiTokenInstance}),
  deleteNotification: (receiptId: number) => deleteNotification({idInstance, apiTokenInstance}, receiptId)
});
