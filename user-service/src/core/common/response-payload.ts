import { ResponseCodeEnum } from '../enum/response-code.enum';

export interface ResponsePayload<T> {
  statusCode: ResponseCodeEnum;
  message?: string;
  data?: T;
  meta?: unknown;
}
