import type {GetAccountSettingsResponse} from '../../api/account/types.ts';
import type {FC} from 'react';
import {Box} from '@mantine/core';
import classes from './ChatsWorkSpace.module.css';
import {AccountCard} from './components/AccountCard/AccountCard.tsx';
import {ChatsList} from '../ChatsList/ChatsList.tsx';

export type ChatsWorkSpaceProps = {
  account: GetAccountSettingsResponse;
};

export const ChatsWorkSpace: FC<ChatsWorkSpaceProps> = ({account}) => {
  return (
    <Box className={classes.container} style={{background: 'red'}}>
      {/*<ChatList />*/}
      <Box>
        <AccountCard account={account} />
        <ChatsList />
      </Box>
      <Box className={classes.chatWindow} style={{background: 'green'}}>
        <Box style={{background: 'blue'}}>2</Box>
        <Box style={{background: 'purple'}}>3</Box>
        <Box style={{background: 'magenta'}}>4</Box>
        {/*<ChatHeader />*/}
        {/*<MessageList />*/}
        {/*<MessageInput />*/}
      </Box>
    </Box>
  );
}