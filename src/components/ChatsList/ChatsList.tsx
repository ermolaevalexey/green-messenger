import {type FC} from 'react';
import {Box, ScrollArea} from '@mantine/core';
import type {GetContactInfoResponse} from '../../api/account/types.ts';
import {RecipientCard} from './components/RecipientCard/RecipientCard.tsx';
import {ChatSetup} from '../ChatSetup/ChatSetup.tsx';
import classes from './ChatsList.module.css';

type ChatsListProps = {
  items: GetContactInfoResponse[];
  activeChatId: string;
  update: (recipient: GetContactInfoResponse) => void;
  setActive: (chatId: string) => void;
};

export const ChatsList: FC<ChatsListProps> = ({items, activeChatId, update, setActive}) => {
  return (
    <>
      <ScrollArea className={classes.listContainer}>
        {items.map((chat) => (
          <RecipientCard
            key={chat.chatId}
            recipient={chat}
            isActive={activeChatId === chat.chatId}
            onClick={setActive}
          />
        ))}
      </ScrollArea>

      <Box p="md">
        <ChatSetup onCreateChat={update} />
      </Box>
    </>
  );
};
