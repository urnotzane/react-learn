import "whatwg-fetch";
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

export const requestPosts = (dataName) => {
  return {
    type: REQUEST_POSTS,
    dataName
  };
}

export const receivePosts = (json, dataName) => {
  return {
    type: RECEIVE_POSTS,
    dataName,
    data: json,
    receivedAt: Date.now()
  };
}

const fetchRequest = (url, params, dataName) => {

  return function (dispatch) {
    dispatch(requestPosts(dataName))

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
        dispatch(receivePosts(eval("(" + json + ")"), dataName));
      });
  };
}

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
 * 请求数据的函数
 * @param url 请求地址
 * @param params 请求参数
 * @param dataName 请求的数据命名
*/
const fetchRequestIfNeeded = (url, params, dataName) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), dataName)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchRequest(url, params, dataName));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}

export default fetchRequestIfNeeded