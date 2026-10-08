import type {GetAccountSettingsRequest, GetAccountSettingsResponse} from './types.ts';
import axios from 'axios';
import {API_URL} from '../constatns.ts';

export const getAccountSettings = (request: GetAccountSettingsRequest) => {
  return axios.get<GetAccountSettingsResponse>(`${API_URL}/waInstance${request.idInstance}/getAccountSettings/${request.apiTokenInstance}`);
};