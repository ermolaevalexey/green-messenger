import type {FC} from 'react';
import type {GetContactInfoResponse} from '../../../../api/account/types.ts';
import {Avatar, Box, Text, UnstyledButton} from '@mantine/core';
import classes from './RecipientCard.module.css';

type RecipientCardProps = {
  recipient: GetContactInfoResponse;
  isActive?: boolean;
  onClick?: (chatId: string) => void;
};

export const RecipientCard: FC<RecipientCardProps> = ({recipient, isActive = false, onClick}) => {
  return (
    <UnstyledButton
      className={`${classes.container} ${isActive ? classes.container_active : ''}`}
      onClick={() => onClick?.(recipient.chatId)}
      aria-pressed={isActive}
    >
      <Avatar src={recipient.avatar} radius="xl" size="lg" name={recipient.name} />

      <Box className={classes.accountData}>
        <Text className={classes.name} fw={600} lineClamp={1}>
          {recipient.name}
        </Text>

        <Text className={classes.username} lineClamp={1}>
          {recipient.username}
        </Text>
      </Box>
    </UnstyledButton>
  );
};
