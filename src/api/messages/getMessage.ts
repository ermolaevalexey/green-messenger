import axios from 'axios';
import {API_URL} from '../constatns.ts';
import type {GetMessageRequest, GetMessageResponse} from './types.ts';

export const getMessage = (request: GetMessageRequest) => {
  return axios.post<GetMessageResponse>(`${API_URL}/waInstance${request.idInstance}/getMessage/${request.apiTokenInstance}`, {
    ...request.body
  });
};