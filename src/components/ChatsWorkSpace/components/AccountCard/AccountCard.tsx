import type {GetAccountSettingsResponse} from '../../../../api/account/types.ts';
import type {FC} from 'react';
import {Avatar, Badge, Box, Flex, Title} from '@mantine/core';
import classes from './AccountCard.module.css';

type AccountCardProps = {
  account: GetAccountSettingsResponse;
};

export const AccountCard: FC<AccountCardProps> = ({account}) => {
  return (
    <Flex className={classes.container} gap={12} align="center" justify="space-between">
      <Avatar src={account.avatar} radius="xl" size="lg" />
      <Box className={classes.accountData}>
        <Title order={2}>{account.username}</Title>
        <Badge>{account.stateInstance}</Badge>
      </Box>
    </Flex>
  );
};
