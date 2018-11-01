import "whatwg-fetch";

export const addTodo = text => {
  return {
    type: "ADD_TODO",
    text
  };
};

export const toggleTodo = id => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

export const deleteTodo = id => {
  return {
    type: "DELETE_TODO",
    id
  };
};

export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(dataName) {
  return {
    type: REQUEST_POSTS,
    dataName
  };
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function receivePosts(json, dataName) {
  return {
    type: RECEIVE_POSTS,
    dataName,
    posts: json,
    receivedAt: Date.now()
  };
}

// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

function fetchPosts(url, params, dataName) {
  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function(dispatch) {
    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestPosts(dataName));

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

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
        // https://github.com/facebook/react/issues/6895
        error => console.log("An error occurred.", error)
      )
      .then(json =>
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
        dispatch(receivePosts(eval("(" + json + ")"), dataName))
      );
  };
}

function shouldFetchPosts(state, url) {
  const posts = state.postsBySubreddit[url];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(url, params, dataName) {
  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。

  // 当缓存的值是可用时，
  // 减少网络请求很有用。

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), url)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts(url, params, dataName));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}
