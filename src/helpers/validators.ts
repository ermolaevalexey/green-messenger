import {matches} from '@mantine/form';

export const isPhoneNumber = (errorMessage: string) => {
  return matches(/^\+?\d{10,15}$/, errorMessage);
};