/**
 * Created by cmios on 2017/5/15.
 */
export function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady'
      , function() {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
}

// connectWebViewJavascriptBridge(function(bridge) {
//   bridge.init(function(message, responseCallback) {
//     console.log('JS got a message', message);
//     var data = {
//       'Javascript Responds': '测试中文!'
//     };
//     console.log('JS responding with', data);
//     responseCallback(data);
//   });
//
//   bridge.registerHandler("functionInJs", function(data, responseCallback) {
//     alert(data);
//
//     var responseData = "Javascript Says Right back aka!";
//     responseCallback(responseData);
//   });
// })
