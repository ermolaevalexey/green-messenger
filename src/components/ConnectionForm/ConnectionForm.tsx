import {isNotEmpty, matches, useForm} from '@mantine/form';
import {Button, PasswordInput, Stack, Text, TextInput} from '@mantine/core';
import type {FC} from 'react';
import type {ConnectionFormValues} from './ConnectionForm.types.ts';
import classes from './ConnectionForm.module.css';

export type ConnectionFormProps = {
  onSubmit: (values: ConnectionFormValues) => void;
  isPending?: boolean;
};

export const ConnectionForm: FC<ConnectionFormProps> = ({onSubmit, isPending = false}) => {
  const form = useForm<ConnectionFormValues>({
    mode: 'uncontrolled',
    name: 'ConnectionForm',
    initialValues: {
      idInstance: '',
      apiTokenInstance: '',
    },
    validate: {
      idInstance: matches(/^\d{10,}$/, 'Введите ID из 10 или более цифр'),
      apiTokenInstance: isNotEmpty('Введите API Token'),
    },
    validateInputOnBlur: true,
  });

  return (
    <form id="ConnectionForm" className={classes.form} onSubmit={form.onSubmit(onSubmit)}>
      {' '}
      <Stack gap="md">
        {' '}
        <Text className={classes.description} size="sm">
          Укажите идентификатор экземпляра и API-токен Green-API, чтобы подключиться к
          аккаунту.{' '}
        </Text>
        <TextInput
          key={form.key('idInstance')}
          label="ID экземпляра"
          placeholder="Например, 7100000000"
          autoComplete="username"
          withAsterisk
          disabled={isPending}
          {...form.getInputProps('idInstance')}
        />
        <PasswordInput
          key={form.key('apiTokenInstance')}
          label="API-токен"
          placeholder="Введите API Token Instance"
          autoComplete="current-password"
          withAsterisk
          disabled={isPending}
          {...form.getInputProps('apiTokenInstance')}
        />
        <Button
          className={classes.submitButton}
          type="submit"
          fullWidth
          loading={isPending}
          disabled={isPending}
        >
          Подключиться
        </Button>
      </Stack>
    </form>
  );
};
