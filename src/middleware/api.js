import "whatwg-fetch";
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

/**
 * 请求数据和函数集合
 */
const UtilFetch = {};

/**
 * POST请求
 */
UtilFetch.post = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(`/api${url}`, {
      method: "POST",
      credentials: "include", //包含cookie
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(
        response => response.text(),
        // 不要使用 catch，因为会捕获
        // 在 dispatch 和渲染中出现的任何错误，
        // 导致 'Unexpected batch number' 错误。
        error => console.log("An error occurred.", error)
      )
      .then(json => {
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
        resolve(eval("(" + json + ")"));
      });
  });
};

/**
 * GET请求
 */
UtilFetch.get = (url, params) => {
  return new Promise(resolve => {
    fetch(FormatParams(url, params), {
      method: "GET",
      credentials: "include", //包含cookie
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(
        response => response.text(),
        // 不要使用 catch，因为会捕获
        // 在 dispatch 和渲染中出现的任何错误，
        // 导致 'Unexpected batch number' 错误。
        error => console.log("An error occurred.", error)
      )
      .then(json => {
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
        if (url.indexOf("NavNodes") > -1) {
          json = json.replace("var models=", "");
          resolve(eval("(" + json + ")"));
        } else {
          resolve(eval("(" + json + ")"));
        }
      });
  });
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
