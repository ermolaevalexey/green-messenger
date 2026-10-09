import {Box, Button, TextInput} from '@mantine/core';
import type {FC} from 'react';
import {useApi} from '../../../../api/provider.tsx';
import {isNotEmpty, useForm} from '@mantine/form';
import type {Message} from '../../ChatsWorkSpace.types.ts';
import {useMutation} from '@tanstack/react-query';

type MessageInputProps = {
  activeChatId: string;
  onSendMessage: (message: Message) => void;
}
export const MessageInput: FC<MessageInputProps> = ({activeChatId, onSendMessage}) => {
  const api = useApi();
  
  const form = useForm({
    mode: 'uncontrolled',
    name: 'SendMessageForm',
    initialValues: {
      message: ''
    },
    validate: {
      message: isNotEmpty('Enter your message')
    }
  });
  
  const {mutateAsync: sendMessage, isPending} = useMutation({
    mutationFn: async (values: {message: string}) => api.sendMessage(activeChatId, values.message),
    onSuccess: (response) => {
      onSendMessage({
        id: String(response.data.idMessage),
        chatId: activeChatId,
        text: form.values.message,
        direction: 'outgoing',
        timestamp: Date.now(),
        status: 'sent'
      });
    }
  })
  
  return (
    <Box style={{background: 'magenta'}}>
      <form onSubmit={form.onSubmit((values) => sendMessage(values))}>
        <TextInput
          placeholder="Enter messsage..."
          disabled={!activeChatId || isPending}
          loading={isPending}
          {...form.getInputProps('message')}
        />
        <Button disabled={!activeChatId || !form.values.message} loading={isPending} type="submit">
          Send message
        </Button>
      </form>
    </Box>
  )
}