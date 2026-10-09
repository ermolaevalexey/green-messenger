import type {CheckRecipientAccountResponse, GetContactInfoRequest} from './types.ts';
import axios from 'axios';
import {API_URL} from '../constatns.ts';

export const getContactInfo = (request: GetContactInfoRequest) => {
  return axios.post<CheckRecipientAccountResponse>(`${API_URL}/waInstance${request.idInstance}/getContactInfo/${request.apiTokenInstance}`, {
    ...request.body
  });
};