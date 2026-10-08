import {useState} from 'react';
import type {GetAccountSettingsResponse} from '../../api/account/types';
import type {BaseRequest, Credentials} from '../../api/types';
import {getAccountSettings} from '../../api/account/getAccountSettings';

export const useData = () => {
  const [account, setAccount] = useState<GetAccountSettingsResponse | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const onConnect = async (values: BaseRequest) => {
    setCredentials(values);
    const {data: accountResponse} = await getAccountSettings(values);

    if (accountResponse) {
      setAccount(accountResponse);
    }
  };

  return {
    account,
    credentials,
    onConnect,
  };
};
