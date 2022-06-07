import { extend } from 'lodash-es';

declare type RequestOptions = UniApp.RequestOptions;

declare namespace Request {
  /**
   * 选项配置
   */
  interface OptionsConfig extends Partial<RequestOptions> {
    interceptors?: UniApp.InterceptorOptions;
    baseUrl: string;
  }

  interface Params<T = any> {
    url: string;
    data?: string | AnyObject | ArrayBuffer | T;
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
    skipAuth?: Boolean;
  }
}
