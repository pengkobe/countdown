/** yipeng注:
 * xFetch返回值格式要求很BT:{success: true,data:data}
 */

import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const { success, message } = res.jsonResult;
  if (!success) {
    return Promise.reject(message);
  }
  return res;
}

function xFetch(url, options) {
  var url = 'https://yipeng.info' + url;
  // var url = 'http://localhost:3000' + url;
  // ... 其实是将数组转化为 p1,p2,p3,
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    //  authorization: cookie.get('authorization') || '',
  };
  opts.credentials = 'include';
  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse)
    .catch(e => {
      console.log("Oops, error:", e);
      alert("opps~你无该操作无权限,你所做的操作并不会提交至服务器哦:)~");
    });
}

export default xFetch;
