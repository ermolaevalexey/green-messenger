import {isNotEmpty, matches, useForm} from '@mantine/form';
import {Button, Group, PasswordInput, TextInput} from '@mantine/core';
import './ConnectionForm.css';
import type {ConnectionFormValues} from './ConnectionForm.types.ts';
import type {FC} from 'react';

export type ConnectionFormProps = {
  onSubmit: (values: ConnectionFormValues) => void;
};

export const ConnectionForm: FC<ConnectionFormProps> = ({onSubmit}) => {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'ConnectionForm',
    initialValues: {
      idInstance: '',
      apiTokenInstance: '',
    },
    validate: {
      idInstance: matches(/^\d{10,}$/, 'Id must be at least 10 chars!'),
      apiTokenInstance: isNotEmpty('Token is required'),
    },
    validateInputOnBlur: true
  });

  return (
    <form id="ConnectionForm" onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <TextInput
        className="ConnectionForm__input"
        label="Id Instance"
        withAsterisk
        disabled={form.submitting}
        loading={form.submitting}
        {...form.getInputProps('idInstance')}
      />
      <PasswordInput
        className="ConnectionForm__input"
        label="API Token Instance"
        withAsterisk
        disabled={form.submitting}
        loading={form.submitting}
        {...form.getInputProps('apiTokenInstance')}
      />
      <Group justify="flex-end">
        <Button type="submit" disabled={!form.isValid()} loading={form.submitting}>
          Connect
        </Button>
      </Group>
    </form>
  );
};
