import {Box, Button, Textarea} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useMutation} from '@tanstack/react-query';
import type {FC, KeyboardEvent} from 'react';
import {PaperPlaneRightIcon} from '@phosphor-icons/react';
import {useApi} from '../../../../api/provider.tsx';
import type {Message} from '../../ChatsWorkSpace.types.ts';
import classes from './MessageInput.module.css';

type MessageInputProps = {
  activeChatId: string;
  onSendMessage: (message: Message) => void;
};

type MessageFormValues = {
  message: string;
};

export const MessageInput: FC<MessageInputProps> = ({activeChatId, onSendMessage}) => {
  const api = useApi();

  const form = useForm<MessageFormValues>({
    initialValues: {
      message: '',
    },
    validate: {
      message: (value) => (value.trim().length > 0 ? null : 'Введите текст сообщения'),
    },
  });

  const {mutate: sendMessage, isPending} = useMutation({
    mutationFn: ({message}: MessageFormValues) => api.sendMessage(activeChatId, message.trim()),

    onSuccess: (response, variables) => {
      onSendMessage({
        id: String(response.data.idMessage),
        chatId: activeChatId,
        text: variables.message.trim(),
        direction: 'outgoing',
        timestamp: Date.now(),
        status: 'sent',
      });

      form.reset();
    },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      
      if (activeChatId && form.values.message.trim() && !isPending) {
        sendMessage(form.values);
      }
    }
  };

  return (
    <Box className={classes.container}>
      <form className={classes.form} onSubmit={form.onSubmit((values) => sendMessage(values))}>
        <Textarea
          className={classes.input}
          placeholder="Напишите что-нибудь..."
          aria-label="Текст сообщения"
          autosize
          minRows={1}
          maxRows={4}
          resize="none"
          disabled={!activeChatId || isPending}
          onKeyDown={handleKeyDown}
          {...form.getInputProps('message')}
        />
        
        <Button
          type="submit"
          className={classes.sendButton}
          aria-label="Send message"
          disabled={!activeChatId || !form.values.message.trim() || isPending}
          loading={isPending}
        >
          <PaperPlaneRightIcon width={20} height={20} size={20} weight="fill" />
        </Button>
      </form>
    </Box>
  );
};
