import axios from 'axios';
import {API_URL} from '../constatns.ts';
import type {SendMessageRequest, SendMessageResponse} from './types.ts';

export const sendMessage = (request: SendMessageRequest) => {
  return axios.post<SendMessageResponse>(`${API_URL}/waInstance${request.idInstance}/sendMessage/${request.apiTokenInstance}`, {
    ...request.body
  });
};