import {type FC, useState} from 'react';
import type {CheckRecipientAccountResponse} from '../../api/account/types.ts';
import {RecipientCard} from './components/RecipientCard/RecipientCard.tsx';
import {ChatSetup} from '../ChatSetup/ChatSetup.tsx';

export const ChatsList: FC = () => {
  const [chatsList, updateChatsList] = useState<CheckRecipientAccountResponse[]>([]);

  return (
    <>
      {chatsList.map((chat) => (
        <RecipientCard key={chat.chatId} recipient={chat} />
      ))}
      <ChatSetup onCreateChat={(recipient) => updateChatsList([...chatsList, recipient])} />
    </>
  );
};
