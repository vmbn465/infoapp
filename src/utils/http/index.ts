import { HttpRequest } from '@/utils/http/request';
import { assign } from 'lodash-es';
import { Request, RequestOptions } from '@/utils/types/request';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function invoke(args: Request.Params & Partial<RequestOptions>) {
  args = assign(args, {
    dataType: 'json',
    responseType: 'text',
    header: {
      'Content-Type': 'application/json;charset=UTF-8;',
      Accept: 'application/json, text/plain, */*',
    },
  });
}

function createRequest() {
  return new HttpRequest({
    baseUrl: BASE_URL,
    interceptors: {
      invoke,
    },
  });
}

export const request = createRequest();
