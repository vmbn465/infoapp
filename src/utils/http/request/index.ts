const BASE_URL = import.meta.env.VITE_BASE_URL;
function createRequest(options: RequestOptions) {
  const _options = Object.assign({}, options);
  return new Promise((resolve, reject) => {
    uni.request({
      ..._options,
      success(res) {
        const { statusCode, data: resData } = res;
        if (statusCode === 200) {
          const { code, data, message } = resData;
          switch (code) {
            case 10000:
              resolve(resData);
              break;
            case 10001:
            default:
              reject(resData);
              break;
          }
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

export const request = createRequest;

function beforeRequestInterceptors(args: any) {
  uni.showLoading({});
  args.url = `${BASE_URL}${args.url}`;
  args.dataType = 'json';
  args.responseType = 'text';
  args.header = {
    'Content-Type': 'application/json;charset=UTF-8;',
    Accept: 'application/json, text/plain, */*',
  };
}

function responseSuccessInterceptors(res: any) {}

function responseFailInterceptors(err: any) {}

function completeInterceptors(res: any) {
  uni.hideLoading();
}

export function requestInterceptors() {
  uni.addInterceptor('request', {
    invoke(args) {
      // request 触发前拦截
      beforeRequestInterceptors(args);
    },
    success(res) {
      // 响应成功后触发拦截
      responseSuccessInterceptors(res);
    },
    fail(err) {
      // 响应失败后触发拦截
      responseFailInterceptors(err);
    },
    complete(res) {
      // 响应失败后触发拦截
      completeInterceptors(res);
    },
  });
}
