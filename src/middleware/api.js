import "whatwg-fetch";
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

/**
 * @todo 开始请求数据的action
 * @param {string} dataName - 数据的命名
 */
export const requestFetch = (dataName) => {
  return {
    type: REQUEST_POSTS,
    dataName
  };
}

/**
 * @todo 已接收到请求数据的action
 * @param {Object} json - 请求返回的数据
 * @param {string} dataName - 数据的命名
 */
export const receiveFetch = (json, dataName) => {
  return {
    type: RECEIVE_POSTS,
    dataName,
    data: json,
    receivedAt: Date.now()
  };
}

/**
 * @todo 判断是否已请求过数据
 * @param {Object} state 
 */
const shouldFetchPosts = (state) => {
  const data = state.fetchData.q;
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
}

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
const UtilFetch = {}

/** 
 * POST请求
*/
UtilFetch.post = (url, params, dataName) => {

  return function (dispatch) {
    dispatch(requestFetch(dataName))

    return fetch(`/api${url}`, {
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
        dispatch(receiveFetch(eval("(" + json + ")"), dataName));
      });
  };
}

/**
 * GET请求
 */
UtilFetch.get = (url, params, dataName) => {

  return function (dispatch) {
    dispatch(requestFetch(dataName))

    return fetch(FormatParams(url, params), {
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
        dispatch(receiveFetch(eval("(" + json + ")"), dataName));
      });
  };
}



/**
 * 请求数据的函数
 * get/post/upload/delete
 * @param url 请求地址
 * @param params 请求参数
 * @param dataName 请求的数据命名
 */
const fetchRequestIfNeeded = (url, params, dataName, method) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), dataName)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      console.log(method)
      switch (method) {
        case 'get':
          return dispatch(UtilFetch.get(url, params, dataName));
        case 'post':
          return dispatch(UtilFetch.post(url, params, dataName));
        default:

      }

    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}

export default fetchRequestIfNeeded