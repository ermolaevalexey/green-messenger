import type {GetContactInfoRequest, GetContactInfoResponse} from './types.ts';
import axios from 'axios';
import {API_URL} from '../constatns.ts';

export const getContactInfo = (request: GetContactInfoRequest) => {
  return axios.post<GetContactInfoResponse>(`${API_URL}/waInstance${request.idInstance}/getContactInfo/${request.apiTokenInstance}`, {
    ...request.body
  });
};