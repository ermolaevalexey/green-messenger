import type {BaseRequest} from '../types.ts';

export type GetAccountSettingsRequest = BaseRequest<unknown>;

export type CheckRecipientAccountRequest = BaseRequest<{
  phoneNumber: number
}>;

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