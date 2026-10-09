import {type FC} from 'react';
import type {GetContactInfoResponse} from '../../api/account/types.ts';
import {RecipientCard} from './components/RecipientCard/RecipientCard.tsx';
import {ChatSetup} from '../ChatSetup/ChatSetup.tsx';

type ChatsListProps = {
  items: GetContactInfoResponse[];
  activeChatId: string;
  update: (recipient: GetContactInfoResponse) => void;
  setActive: (chatId: string) => void;
};
export const ChatsList: FC<ChatsListProps> = ({items, activeChatId, update, setActive}) => {
  return (
    <>
      {items.map((chat) => (
        <RecipientCard
          key={chat.chatId}
          recipient={chat}
          isActive={activeChatId === chat.chatId}
          onClick={setActive}
        />
      ))}
      <ChatSetup onCreateChat={(recipient) => update(recipient)} />
    </>
  );
};
