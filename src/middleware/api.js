import "whatwg-fetch";
import { notification } from 'antd';
import { FETCH_REQUEST } from "../actions";

/**
 * @todo 开始请求数据的action
 * @param {string} promise - 异步promise请求
 */
const requestFetch = promise => {
  return {
    type: FETCH_REQUEST,
    payload: promise
  };
};

/**
 * @todo 判断是否已请求过数据
 * @param {Object} state
 */
const shouldFetchPosts = state => {
  const data = state.fetchData.q;
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
};

/**
 * @todo 格式化get请求的url
 * @param {string} url - api地址
 * @param {Object} params - 参数
 */
const FormatParams = (url, params) => {
  let urlRes = [];
  let URL = `/api${url}`;
  if (params) {
    Object.keys(params).forEach(key => urlRes.push(key + "=" + params[key]));
    URL = `${URL}?${urlRes.join("&")}`;
  }
  return URL;
};

/**请求错误信息 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**根据请求status返回的提示 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response.text();
  }
  notification.destroy()
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * fetch请求
 * @param url - 格式化后的url
 * @param headers - 请求头
 */
const FetchHttp = (url, headers) => {
  return new Promise(resolve => {
    fetch(url, headers)
      .then(res => {
        if (res.ok) {
          return res.text();
        } else {
          // if (headers.method !== 'GET') {
          checkStatus(res)
          // }
          resolve({ statusCode: res.status, result: false });
        }
      })
      .then(text => {
        if (text) {
          if (url.indexOf('NavNode') > -1) {
            text = text.replace('var models=', '')
            const json = eval("(" + text + ")");
            json.result = true;
            resolve(json);
          } else {
            const json = eval("(" + text + ")");
            json.result = true;
            resolve(json);
          }
        }
      })
      .catch(err => {
        console.log(err);
        resolve({ statusCode: -1, result: false });
      });
  });
};

/**
 * 请求数据和函数集合
 */
const UtilFetch = {};

/**
 * POST请求
 */
UtilFetch.post = (url, params) => {
  const headers = {
    method: "POST",
    credentials: "include", //包含cookie
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  return FetchHttp("/api" + url, headers);
};

/**
 * GET请求
 */
UtilFetch.get = (url, params) => {
  const headers = {
    method: "GET",
    credentials: "include", //包含cookie
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  return FetchHttp(FormatParams(url, params), headers);
};

/**
 * 请求数据的函数
 * get/post/upload/delete
 * @param url 请求地址
 * @param method get/post
 * @param params 请求参数
 */
const fetchRequestIfNeeded = (url, method, params) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      // 在 thunk 里 dispatch 另一个 thunk！
      switch (method) {
        case "get":
          return dispatch(requestFetch(UtilFetch.get(url, params)));
        case "post":
          return dispatch(requestFetch(UtilFetch.post(url, params)));
        default:
      }
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
};

export default fetchRequestIfNeeded;
