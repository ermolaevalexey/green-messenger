import type {Credentials} from './types.ts';
import {getAccountSettings, checkRecipientAccount, getContactInfo} from './account';
import {sendMessage, getMessage, receiveNotification, deleteNotification} from './messages';

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
