import {useDisclosure} from '@mantine/hooks';
import {ActionIcon, Button, Group, MaskInput, Modal, Stack, Text} from '@mantine/core';
import {PlusIcon} from '@phosphor-icons/react';
import {useForm} from '@mantine/form';
import {useMutation} from '@tanstack/react-query';
import {useState, type FC} from 'react';
import {useApi} from '../../api/provider.tsx';
import {isPhoneNumber} from '../../helpers/validators.ts';
import type {GetContactInfoResponse} from '../../api/account/types.ts';
import classes from './ChatSetup.module.css';

type ChatSetupProps = {
  onCreateChat: (recipient: GetContactInfoResponse) => void;
};

export const ChatSetup: FC<ChatSetupProps> = ({onCreateChat}) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [requestError, setRequestError] = useState('');
  const api = useApi();

  const form = useForm({
    mode: 'uncontrolled',
    name: 'AddChatForm',
    initialValues: {
      phoneNumber: '',
    },
    validate: {
      phoneNumber: isPhoneNumber('Введите корректный номер телефона'),
    },
    validateInputOnBlur: true,
  });

  const {
    mutate: createChat,
    isPending,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (values: {phoneNumber: string}) => {
      const account = await api.checkRecipientAccount(values.phoneNumber);

      if (!account?.data?.chatId) {
        return null;
      }

      return api.getContactInfo(account.data.chatId);
    },
    onSuccess: (response) => {
      if (!response) {
        setRequestError('Не удалось найти контакт по этому номеру');
        return;
      }

      onCreateChat(response.data as unknown as GetContactInfoResponse);
      form.reset();
      setRequestError('');
      close();
    },
    onError: () => {
      setRequestError('Не удалось добавить чат. Проверьте номер и попробуйте ещё раз.');
    },
  });

  const handleClose = () => {
    close();
    form.reset();
    resetMutation();
    setRequestError('');
  };

  const handleOpen = () => {
    form.reset();
    resetMutation();
    setRequestError('');
    open();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="Новый чат"
        centered
        radius="lg"
        padding="xl"
        size="md"
        classNames={{
          title: classes.modalTitle,
          header: classes.modalHeader,
          body: classes.modalBody,
        }}
      >
        <form
          id="AddChatForm"
          onSubmit={form.onSubmit((values) => {
            setRequestError('');
            createChat(values);
          })}
        >
          {' '}
          <Stack gap="lg">
            {' '}
            <Text className={classes.description} size="sm">
              Введите номер телефона собеседника, чтобы начать переписку.{' '}
            </Text>
            <MaskInput
              label="Номер телефона"
              placeholder="+7 (000) 000-00-00"
              mask="+7 (999) 999-99-99"
              withAsterisk
              autoFocus
              disabled={isPending}
              key={form.key('phoneNumber')}
              defaultValue={form.getValues().phoneNumber}
              onChangeRaw={(raw) => {
                form.setFieldValue('phoneNumber', raw, {
                  forceUpdate: true,
                });
                setRequestError('');
              }}
              error={form.errors.phoneNumber}
            />
            {requestError && (
              <Text className={classes.error} size="sm" role="alert">
                {requestError}
              </Text>
            )}
            <Group justify="flex-end" gap="sm" mt="xs">
              <Button variant="subtle" color="gray" onClick={handleClose} disabled={isPending}>
                Отмена
              </Button>

              <Button
                type="submit"
                loading={isPending}
                disabled={!form.getValues().phoneNumber.trim()}
              >
                Создать чат
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <ActionIcon
        className={classes.addChatButton}
        variant="light"
        color="blue"
        size="xl"
        aria-label="Создать новый чат"
        onClick={handleOpen}
        title="Создать новый чат"
      >
        <PlusIcon size={20} />
        {' '}
        Новый чат
      </ActionIcon>
    </>
  );
};
