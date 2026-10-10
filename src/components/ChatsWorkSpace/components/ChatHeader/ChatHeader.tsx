import {Avatar, Box, Flex, Text} from '@mantine/core';
import type {GetContactInfoResponse} from '../../../../api/account/types.ts';
import type {FC} from 'react';
import classes from './ChatHeader.module.css';

type ChatHeaderProps = {
  chat?: GetContactInfoResponse;
};

export const ChatHeader: FC<ChatHeaderProps> = ({chat}) => {
  return (
    <Flex className={classes.container} align="center" gap="sm">
      <Avatar src={chat?.avatar || null} name={chat?.name} radius="xl" size="md" />
      <Box className={classes.info}>
        <Text className={classes.name} fw={600} lineClamp={1}>
          {chat?.name || 'Выберите или создайте чат'}
        </Text>

        {chat?.phoneNumber && (
          <Text className={classes.phone} lineClamp={1}>
            {chat.phoneNumber}
          </Text>
        )}
      </Box>
    </Flex>
  );
};
