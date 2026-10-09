import type {FC} from 'react';
import type {Message} from '../../ChatsWorkSpace.types.tsx';
import {Box} from '@mantine/core';
import cx from 'classnames';
import classes from './MessageBubble.module.css';

type MessageBubbleProps = {
  message: Message;
};
export const MessageBubble: FC<MessageBubbleProps> = ({message}) => {
  return (
    <Box
      className={cx(
        classes.container,
        message.direction === 'outgoing' ? classes.outgoing : classes.incoming,
      )}
    >
      {message.text}
    </Box>
  );
};
