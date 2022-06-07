import { assign, cloneDeep, reject } from 'lodash-es';
import { Request, RequestOptions } from '@/utils/types/request';

export class HttpRequest {
  private readonly options: Request.OptionsConfig;
  requestTask: UniApp.RequestTask | undefined;

  constructor(options: Request.OptionsConfig) {
    this.options = options;
    this.setupInterceptors();
    this.requestTask = undefined;
  }

  /**
   * 设置拦截器
   * https://uniapp.dcloud.io/api/interceptor.html
   */
  setupInterceptors() {
    this.options.interceptors && uni.addInterceptor('request', this.options.interceptors);
  }

  /**
   * request调用
   * @param requestParams
   * @param options
   */
  async request(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    let _params = cloneDeep(requestParams);
    const url = `${this.options.baseUrl}${_params.url}`;
    _params = assign(_params, this.options, options, { url });
    // this.requestTask = await uni.request(_params);
    return new Promise((resolve, reject) => {
      this.requestTask = uni.request({
        ..._params,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          // #ifdef APP-PLUS
          reject(err);
          // #endif
          // #ifndef APP-PLUS
          reject('请求失败');
          // #endif
        },
        complete: () => {},
      });
    });
  }

  /**
   * 请求中断
   */
  abort() {
    this.requestTask && this.requestTask.abort();
  }

  get(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'GET' }), options);
  }

  post(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'POST' }), options);
  }

  put(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'PUT' }), options);
  }

  delete(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'DELETE' }), options);
  }

  option(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'OPTIONS' }), options);
  }

  /* #ifndef APP-PLUS */

  trace(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'TRACE' }), options);
  }

  connect(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'CONNECT' }), options);
  }

  head(requestParams: Request.Params, options?: Partial<RequestOptions>) {
    return this.request(assign(requestParams, { method: 'HEAD' }), options);
  }

  /* #endif */
}
