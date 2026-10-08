import type {Credentials} from './types.ts';
import {getAccountSettings} from './account/getAccountSettings.ts';
import {checkRecipientAccount} from './account/checkRecipientAccount.ts';

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
});
