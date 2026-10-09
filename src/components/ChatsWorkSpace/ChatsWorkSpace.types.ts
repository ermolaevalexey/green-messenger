export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
export type ApiMessageStatus = 'delivered' | 'read';

export type Message = {
  id: string;
  chatId: string;
  text: string;
  direction: 'incoming' | 'outgoing';
  timestamp: number;
  status?: MessageStatus;
};