import fetch from 'dva/fetch';
import {Toast} from 'antd-mobile';

function parseJSON(response, type) {
  if (type == 'text') {
    return response.text();
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function errTip(err) {
  const errMsg = err.message;

  const response = err.response;
  if (response && response.status >= 200 && response.status < 300) {
    Toast.offline(errMsg, 2);
    return;
  }
  if (errMsg == '网络或服务异常') {
    Toast.offline(errMsg, 2);
    return;
  }

  Toast.fail(errMsg, 2);

}

function paresResult(data, type, callBack) {

  if (typeof callBack == 'function') {
    callBack(data)
    return;
  }

  if (type != 'json') {
    return data;
  }
  if (!data) {

    Toast.offline('网络或服务异常', 2);
    return data;
  }

  //if((typeof data.ResultCode=='undefined')&&(typeof data.errMsg=='undefined')&&(typeof data.say=='undefined')){
  // // alert(JSON.stringify(data));
  //  return data;
  //}

  if (data.ResultCode <= 0) {

    Toast.fail(data.ResultMessage, 2);
    return data;
  }
  if (data.errMsg) {
    Toast.fail(data.errMsg, 2);
    return data;
  }
  if (data.say && data.say.errMsg) {

    Toast.fail(data.say.errMsg, 2);
    return data;
  }

  return data;

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, type,callBack) {
  if (!type) {
    type = 'json';
  }
  url=url.replace('\n','')
  url=url.replace(/\s/g, '');
  url=encodeURI(url);

  return fetch(url)
    .then(checkStatus)
    .then(response=>(parseJSON(response, type)))
    .then(data => (paresResult(data, type,callBack)))
    .catch(err => (errTip(err)));
}
export function post(url, data, type,callBack) {
  if (!type) {
    type = 'json';
  }
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  url=url.replace('\n','')
  url=url.replace(/\s/g, '');
  url=encodeURI(url);
  return fetch(url, options)
    .then(checkStatus)
    .then(response=>(parseJSON(response, type)))
    .then(data => (paresResult(data, type,callBack)))
    .catch(err => ( errTip(err)));
}

//export function getCallBack(url, callBack) {
//  return fetch(url)
//    .then(checkStatus)
//    .then(parseJSON)
//    .then(data => (paresResult(data, 'json', callBack)))
//    .catch(err => (errTip(err)));
//}

//export function syncAjaxGet(url,type){
//  let ret;
//  if(!type){
//    type='json';
//  }
//  $.ajax({
//    type: "get",
//    url: url,
//    cache: false,
//    async: false,  //设置同步了~~~~~~~~~
//    dataType: type,
//    success: function (data) {
//      ret=data;
//    }
//  });
//  return ret;
//}

