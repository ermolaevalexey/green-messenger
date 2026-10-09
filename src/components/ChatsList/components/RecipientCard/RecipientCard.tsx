import type {FC} from 'react';
import type {GetContactInfoResponse} from '../../../../api/account/types.ts';
import {Avatar, Box, Flex, Title, Text} from '@mantine/core';
import classes from './RecipientCard.module.css';

type RecipientCardProps = {
  recipient: GetContactInfoResponse;
  isActive?: boolean;
  onClick?: (chatId: string) => void;
}
export const RecipientCard: FC<RecipientCardProps> = ({recipient, isActive, onClick}) => {
  return (
    <Flex
      className={`${classes.container} ${isActive ? classes.container_active : ''}`}
      onClick={() => onClick?.(recipient.chatId)}
    >
      <Avatar src={recipient.avatar} radius="xl" size="lg" />
      <Box className={classes.accountData}>
        <Title order={3}>{recipient.name}</Title>
        <Text c={isActive ? 'white' : 'dimmed'}>{recipient.username}</Text>
      </Box>
    </Flex>
  );
}