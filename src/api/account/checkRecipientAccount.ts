import type {CheckRecipientAccountRequest, CheckRecipientAccountResponse} from './types.ts';
import axios from 'axios';
import {API_URL} from '../constatns.ts';

export const checkRecipientAccount = (request: CheckRecipientAccountRequest) => {
  return axios.post<CheckRecipientAccountResponse>(`${API_URL}/waInstance${request.idInstance}/checkAccount/${request.apiTokenInstance}`, {
    ...request.body
  });
};