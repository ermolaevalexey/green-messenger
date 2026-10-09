import axios from 'axios';
import {API_URL} from '../constatns.ts';
import type {DeleteNotificationRequest, DeleteNotificationResponse} from './types.ts';

export const deleteNotification = (request: DeleteNotificationRequest, receiptId: number) => {
  return axios.delete<DeleteNotificationResponse>(`${API_URL}/waInstance${request.idInstance}/deleteNotification/${request.apiTokenInstance}/${receiptId}`);
};