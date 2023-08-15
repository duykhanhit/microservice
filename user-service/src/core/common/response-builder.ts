import { ResponseCodeEnum } from '../enum/response-code.enum';
import { ResponsePayload } from './response-payload';

export class ResponseBuilder<T> {
  private payload: ResponsePayload<T> = {
    statusCode: ResponseCodeEnum.SUCCESS,
  };

  constructor(data?: T) {
    this.payload.data = data;
  }

  withCode(code: ResponseCodeEnum): ResponseBuilder<T> {
    this.payload.statusCode = code;
    return this;
  }

  withMessage(message: string): ResponseBuilder<T> {
    this.payload.message = message;
    return this;
  }

  withData(data: T): ResponseBuilder<T> {
    this.payload.data = data;
    return this;
  }

  withMeta(meta: unknown): ResponseBuilder<T> {
    this.payload.meta = meta;
    return this;
  }

  build(): ResponsePayload<T> {
    return this.payload;
  }
}
