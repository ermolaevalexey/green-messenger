import type {BaseRequest} from '../types.ts';

export type GetAccountSettingsRequest = BaseRequest<unknown>;

export type CheckRecipientAccountRequest = BaseRequest<{
  phoneNumber: number
}>;

export type GetContactInfoRequest = BaseRequest<{
  chatId: string
}>

export type StateInstance = 'notAuthorized' // Инстанс не авторизован
| 'authorized' // Инстанс авторизован
| 'blocked' // Инстанс получил перманентную блокировку
| 'suspended' // На аккаунте наблюдается временная блокировка
| 'starting' // Инстанс в процессе запуска (сервисный режим)
| 'pendingPassword'

export type GetAccountSettingsResponse = {
  avatar: string;
  phone: string;
  stateInstance: StateInstance;
  chatId: string;
  username: string;
  historySyncProgress: number;
  logoutProcess: boolean;
};

export type CheckRecipientAccountResponse = {
  exist: boolean;
  chatId: string;
  username: string;
  phoneNumber: number;
  fromCache: boolean;
};

export type GetContactInfoResponse = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: 'user' | 'group';
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
  username: string;
  isPremium: boolean;
  isVerified: boolean;
  isScam: boolean;
  description: string;
};