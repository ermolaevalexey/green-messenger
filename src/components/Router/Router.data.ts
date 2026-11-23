import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import type {GetAccountSettingsResponse} from '../../api/account/types';
import type {BaseRequest, Credentials} from '../../api/types';
import {getAccountSettings} from '../../api/account/getAccountSettings';

export const useData = () => {
  const [account, setAccount] = useState<GetAccountSettingsResponse | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const {
    mutate: connect,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (values: BaseRequest) => {
      const {data} = await getAccountSettings(values);

      if (!data) {
        throw new Error('Не удалось получить настройки аккаунта');
      }

      return {data, credentials: values};
    },
    onSuccess: ({data, credentials}) => {
      setCredentials(credentials);
      setAccount(data);
    },
  });

  return {
    account,
    credentials,
    onConnect: connect,
    isPending,
    error,
  };
};
