import type {FC} from 'react';
import type {CheckRecipientAccountResponse} from '../../../../api/account/types.ts';
import {Avatar, Box, Flex, Title} from '@mantine/core';
import classes from '../../../ChatsWorkSpace/components/AccountCard/AccountCard.module.css';

type RecipientCardProps = {
  recipient: CheckRecipientAccountResponse;
}
export const RecipientCard: FC<RecipientCardProps> = ({recipient}) => {
  return (
    <Flex>
      <Avatar radius="xl" size="lg" />
      <Box className={classes.accountData}>
        <Title>{recipient.username}</Title>
      </Box>
    </Flex>
  )
}