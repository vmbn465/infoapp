import { request } from '@/utils/http';

const LOGIN = '/login';

export function login(params: LoginParams) {
  return request.post<API<LoginModel>>(LOGIN, params);
}
