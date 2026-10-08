export type BaseRequest<T = object> = {
  idInstance: string;
  apiTokenInstance: string;
  body?: T;
};

export type Credentials = Pick<BaseRequest, 'idInstance' | 'apiTokenInstance'>;