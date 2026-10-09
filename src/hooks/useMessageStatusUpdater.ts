import {useEffect, useRef} from 'react';
import type {Message, MessageStatus} from '../components/ChatsWorkSpace/ChatsWorkSpace.types.ts';
import type {useApi} from '../api/provider.tsx';

type UseMessageStatusUpdaterParams = {
  messagesByChat: Record<string, Message[]>;
  api: ReturnType<typeof useApi>;
  onStatusChange: (chatId: string, messageId: string, status: MessageStatus) => void;
};

const statusRank = {
  sent: 0,
  delivered: 1,
  read: 2,
} as const;

export function useMessageStatusUpdater({
  messagesByChat,
  api,
  onStatusChange,
}: UseMessageStatusUpdaterParams) {
  const messagesByChatRef = useRef(messagesByChat);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    messagesByChatRef.current = messagesByChat;
  }, [messagesByChat]);

  useEffect(() => {
    let cancelled = false;

    const refreshStatuses = async () => {
      if (isRefreshingRef.current) return;

      isRefreshingRef.current = true;

      try {
        // Снимок актуальных сообщений на момент начала проверки.
        const chats = Object.entries(messagesByChatRef.current);

        for (const [chatId, messages] of chats) {
          for (const message of messages) {
            if (cancelled) return;
            if (message.direction !== 'outgoing') continue;

            const currentStatus = message.status ?? 'sent';

            // Прочитанные сообщения больше не опрашиваем.
            if (currentStatus !== 'sent' && currentStatus !== 'delivered') {
              continue;
            }

            try {
              const response = await api.getMessage(chatId, message.id);

              if (cancelled) return;

              const nextStatus = response.data.statusMessage;

              if (nextStatus !== 'delivered' && nextStatus !== 'read') {
                continue;
              }

              // Не допускаем отката read -> delivered
              // или delivered -> sent.
              if (statusRank[nextStatus] > statusRank[currentStatus]) {
                onStatusChange(chatId, message.id, nextStatus);
              }
            } catch (error) {
              const err = error as {
                response?: {
                  status?: number;
                  data?: {message?: string};
                };
              };

              const isNotFound =
                err.response?.status === 400 &&
                /message not found by id/i.test(err.response?.data?.message ?? '');

              // Сообщение могло ещё не появиться в API.
              // Попробуем проверить его в следующий раз.
              if (!isNotFound) {
                console.error('Failed to refresh message status:', error);
              }
            }
          }
        }
      } finally {
        isRefreshingRef.current = false;
      }
    };

    void refreshStatuses();

    const intervalId = setInterval(() => {
      void refreshStatuses();
    }, 15_000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [api, onStatusChange]);
}
