import {Box, ScrollArea} from '@mantine/core';
import {type FC, useEffect, useRef} from 'react';
import type {Message} from '../../ChatsWorkSpace.types.tsx';
import {MessageBubble} from '../MessageBubble/MessageBubble.tsx';

type MessagesListProps = {
  messages: Message[];
};
export const MessagesList: FC<MessagesListProps> = ({messages}) => {
  const viewport = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);
  
  return (
    <Box style={{background: 'purple'}}>
      <ScrollArea viewportRef={viewport}>
        {messages.map((message) => (
          <MessageBubble message={message} key={message.id} />
        ))}
      </ScrollArea>
    </Box>
  );
};
