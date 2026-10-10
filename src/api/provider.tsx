import type {Credentials} from './types.ts';
import {createContext, type PropsWithChildren, useContext, useMemo} from 'react';
import {createApi} from './api.ts';

const ApiContext = createContext<ReturnType<typeof createApi> | null>(null);

export const ApiProvider = ({
  credentials,
  children,
}: PropsWithChildren<{credentials: Credentials | null}>) => {
  const api = useMemo(() => credentials ? createApi(credentials) : null, [credentials]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = () => {
  const api = useContext(ApiContext);
  
  if (!api) {
    throw new Error('useApi must be used within GreenApiProvider');
  }
  
  return api;
};