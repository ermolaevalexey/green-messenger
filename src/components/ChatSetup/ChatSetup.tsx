import {useDisclosure} from '@mantine/hooks';
import {ActionIcon, Button, Group, MaskInput, Modal} from '@mantine/core';
import {PlusIcon} from '@phosphor-icons/react';
import {useForm} from '@mantine/form';
import {useApi} from '../../api/provider.tsx';
import {isPhoneNumber} from '../../helpers/validators.ts';
import type {FC} from 'react';
import {useMutation} from '@tanstack/react-query';
import type {GetContactInfoResponse} from '../../api/account/types.ts';
import classes from './ChatSetup.module.css';

type ChatSetupProps = {
  onCreateChat: (recipient: GetContactInfoResponse) => void;
};
export const ChatSetup: FC<ChatSetupProps> = ({onCreateChat}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const api = useApi();

  const form = useForm({
    mode: 'uncontrolled',
    name: 'AddChatForm',
    initialValues: {
      phoneNumber: '',
    },
    validate: {
      phoneNumber: isPhoneNumber('Invalid Phone number'),
    },
    validateInputOnBlur: true,
  });

  const {mutateAsync: createChat} = useMutation({
    mutationFn: async (values: {phoneNumber: string}) => {
      const acc = await api.checkRecipientAccount(values.phoneNumber);
      if (acc?.data?.chatId) {
        return api.getContactInfo(acc.data.chatId);
      }
      return null;
    },
    onSuccess: (response) => {
      if (response) {
        onCreateChat(response.data as unknown as GetContactInfoResponse);
        form.reset();
        close();
      }
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new chat">
        <form id="AddChatForm" onSubmit={form.onSubmit((values) => createChat(values))}>
          <MaskInput
            label="Enter recipient's phone number"
            mask="+7 (999) 999-99-99"
            placeholder="+7 (000) 000-00-00"
            defaultValue={form.getValues().phoneNumber}
            onChangeRaw={(raw) => {
              form.setFieldValue('phoneNumber', raw, {
                forceUpdate: true
              });
            }}
            error={form.errors.phoneNumber}
          />
          <Group justify="flex-end">
            <Button type="submit" disabled={!form.isValid()} loading={form.submitting}>
              Create chat
            </Button>
          </Group>
        </form>
      </Modal>

      <ActionIcon
        className={classes.AddChatButton}
        variant="gradient"
        size="xl"
        aria-label="Gradient action icon"
        gradient={{from: 'blue', to: 'cyan', deg: 90}}
        onClick={open}
        title="Create new chat"
      >
        <PlusIcon /> Create new chat
      </ActionIcon>
    </>
  );
};
