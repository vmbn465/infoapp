import Request from './core/Request';
import { assign } from 'lodash-es';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const HEADER = {
  'Content-Type': 'application/json;charset=UTF-8;',
  Accept: 'application/json, text/plain, */*',
};

const getTokenStorage = () => {
  let token = '';
  try {
    token = uni.getStorageSync('token');
  } catch (e) {}
  return token;
};

function createRequest() {
  return new Request({
    baseURL: BASE_URL,
    header: HEADER,
  });
}

const defHttp = createRequest();
// defHttp.setConfig((config) => { /* 设置全局配置 */
//   config.header = {
//     ...config.header,
//     a: 1, // 演示
//     b: 2 // 演示
//   }
//   return config
// })

/**
 * 请求拦截器
 */
defHttp.interceptors.request.use(
  (config) => {
    config.header = assign(config.header, {
      token: getTokenStorage(),
    });

    console.log('interceptors.request', config);
    /*
     if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
       return Promise.reject(config)
     }
     */
    return config;
  },
  (config) => {
    return Promise.reject(config);
  },
);

/**
 * 响应拦截器
 */
defHttp.interceptors.response.use(
  async (response) => {
    /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    return response;
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    console.log(response);
    return Promise.reject(response);
  },
);

export { defHttp };
