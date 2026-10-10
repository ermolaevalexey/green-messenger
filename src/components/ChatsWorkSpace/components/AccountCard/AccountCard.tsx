import type {GetAccountSettingsResponse} from '../../../../api/account/types.ts';
import type {FC} from 'react';
import {Avatar, Badge, Box, Flex, Text} from '@mantine/core';
import classes from './AccountCard.module.css';

type AccountCardProps = {
  account: GetAccountSettingsResponse;
};

export const AccountCard: FC<AccountCardProps> = ({account}) => {
  return (
    <Flex className={classes.container} align="center" gap="sm">
      <Avatar src={account.avatar || null} name={account.username} radius="xl" size="lg" />
      <Box className={classes.accountData}>
        <Text className={classes.username} fw={600} lineClamp={1}>
          {account.username || 'Мой аккаунт'}
        </Text>

        <Text className={classes.caption} size="xs">
          Экземпляр Green-API
        </Text>
      </Box>

      <Badge className={classes.status} variant="light" color="blue">
        {account.stateInstance}
      </Badge>
    </Flex>
  );
};
