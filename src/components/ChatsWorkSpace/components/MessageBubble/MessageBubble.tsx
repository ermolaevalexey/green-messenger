import type {FC} from 'react';
import {Box, Flex, Text} from '@mantine/core';
import {Check, Checks} from '@phosphor-icons/react';
import cx from 'classnames';
import type {Message} from '../../ChatsWorkSpace.types.tsx';
import {MessageText} from '../MessageText/MessageText.tsx';
import classes from './MessageBubble.module.css';

type MessageBubbleProps = {
  message: Message;
};

const formatTime = (timestamp: number) =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);

export const MessageBubble: FC<MessageBubbleProps> = ({message}) => {
  const isOutgoing = message.direction === 'outgoing';

  return (
    <Box className={cx(classes.container, isOutgoing ? classes.outgoing : classes.incoming)}>
      <Text className={classes.messageText}>
        <MessageText text={message.text} />
      </Text>

      <Flex className={classes.meta} justify="flex-end" align="center" gap={4}>
        <Text className={classes.time}>{formatTime(message.timestamp)}</Text>

        {isOutgoing && message.status && (
          <span
            className={cx(classes.status, message.status === 'read' && classes.statusRead)}
            title={
              message.status === 'sent'
                ? 'Sent'
                : message.status === 'delivered'
                  ? 'Delivered'
                  : 'Read'
            }
            aria-label={
              message.status === 'sent'
                ? 'Sent'
                : message.status === 'delivered'
                  ? 'Delivered'
                  : 'Read'
            }
          >
            {message.status === 'sent' ? (
              <Check size={14} weight="regular" />
            ) : (
              <Checks size={16} weight="regular" />
            )}
          </span>
        )}
      </Flex>
    </Box>
  );
};
