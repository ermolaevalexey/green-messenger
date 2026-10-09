import axios from 'axios';
import {API_URL} from '../constatns.ts';
import type {ReceiveNotificationRequest, ReceiveNotificationResponse} from './types.ts';

export const receiveNotification = (request: ReceiveNotificationRequest) => {
  return axios.get<ReceiveNotificationResponse>(`${API_URL}/waInstance${request.idInstance}/receiveNotification/${request.apiTokenInstance}`, {
    ...request.body
  });
};