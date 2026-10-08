import {ConnectionForm} from '../ConnectionForm/ConnectionForm.tsx';
import {useData} from './Router.data.ts';
import {ChatsWorkSpace} from '../ChatsWorkSpace/ChatsWorkSpace.tsx';
import {ApiProvider} from '../../api/provider.tsx';

export const Router = () => {
  const {account, credentials, onConnect} = useData();

  return (
    <>
      {!account && (
        <section id="center">
          <ConnectionForm onSubmit={onConnect} />
        </section>
      )}
      {account && (
        <ApiProvider credentials={credentials}>
          <ChatsWorkSpace account={account} />
        </ApiProvider>
      )}
    </>
  );
};
