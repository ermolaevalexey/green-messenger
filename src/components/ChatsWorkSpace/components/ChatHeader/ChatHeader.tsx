import {Avatar, Box, Flex, Text, Title} from '@mantine/core';
import type {GetContactInfoResponse} from '../../../../api/account/types.ts';
import type {FC} from 'react';

type ChatHeaderProps = {
  chat?: GetContactInfoResponse;
}
export const ChatHeader: FC<ChatHeaderProps> = ({chat}) => {
  return (
    <Flex>
      <Avatar src={chat?.avatar ?? ''} size="md" />
      <Box>
        <Title order={4}>{chat?.name ?? ''}</Title>
        <Text c="dimmed">{chat?.phoneNumber ?? ''}</Text>
      </Box>
    </Flex>
  );
}