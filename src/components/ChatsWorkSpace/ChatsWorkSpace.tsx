import type {GetAccountSettingsResponse, GetContactInfoResponse} from '../../api/account/types.ts';
import {type FC, useCallback, useState} from 'react';
import {Box, Divider} from '@mantine/core';
import classes from './ChatsWorkSpace.module.css';
import {AccountCard} from './components/AccountCard/AccountCard.tsx';
import {ChatsList} from '../ChatsList/ChatsList.tsx';
import {ChatHeader} from './components/ChatHeader/ChatHeader.tsx';
import {MessagesList} from './components/MessagesList/MessagesList.tsx';
import {MessageInput} from './components/MessageInput/MessageInput.tsx';
import type {Message, MessageStatus} from './ChatsWorkSpace.types.tsx';
import {useMessageReceiver} from './hooks/useMessageReceiver.ts';
import {useApi} from '../../api/provider.tsx';
import {useMessageStatusUpdater} from '../../hooks/useMessageStatusUpdater.ts';

export type ChatsWorkSpaceProps = {
  account: GetAccountSettingsResponse;
};

export const ChatsWorkSpace: FC<ChatsWorkSpaceProps> = ({account}) => {
  const [chatsList, updateChatsList] = useState<GetContactInfoResponse[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [messagesByChat, setMessagesByChat] = useState<Record<string, Message[]>>({});
  const api = useApi();

  const addNewChat = (chat: GetContactInfoResponse) => {
    updateChatsList((currentChats) => [...currentChats, chat]);

    setMessagesByChat((current) => ({
      ...current,
      [chat.chatId]: [],
    }));
  };

  const handleMessageReceived = useCallback((message: Message) => {
    setMessagesByChat((current) => ({
      ...current,
      [message.chatId]: [...(current[message.chatId] ?? []), message],
    }));
  }, []);

  const handleMessageStatusChange = useCallback(
    (chatId: string, messageId: string, status: MessageStatus) => {
      setMessagesByChat((current) => ({
        ...current,
        [chatId]: (current[chatId] ?? []).map((message) =>
          message.id === messageId ? {...message, status} : message,
        ),
      }));
    },
    [],
  );

  useMessageReceiver({
    onMessageReceived: handleMessageReceived,
  });

  useMessageStatusUpdater({
    messagesByChat,
    api,
    onStatusChange: handleMessageStatusChange,
  });

  return (
    <Box className={classes.container}>
      <Box className={classes.chatsList}>
        <AccountCard account={account} />
        <Divider my="md" />
        <ChatsList
          items={chatsList}
          activeChatId={activeChatId}
          setActive={setActiveChatId}
          update={(chat) => addNewChat(chat)}
        />
      </Box>
      <Box className={classes.chatWindow}>
        <ChatHeader chat={chatsList.find((item) => item.chatId === activeChatId)} />
        <MessagesList messages={messagesByChat[activeChatId] ?? []} />
        <MessageInput
          activeChatId={activeChatId}
          onSendMessage={(message) => {
            setMessagesByChat((current) => ({
              ...current,
              [message.chatId]: [...(current[message.chatId] ?? []), message],
            }));
          }}
        />
      </Box>
    </Box>
  );
};
