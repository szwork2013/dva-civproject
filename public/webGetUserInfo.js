/**
 * Created by lyunfan on 17/6/19.
 */
//供第三方对接
(function () {

  window._global = window._global || {};

  _global.getBrowserInfo = function () {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
//IE
    if (agent.indexOf("msie") > 0) {
      return "ie";
    }

//firefox
    if (agent.indexOf("firefox") > 0) {
      return 'firefox';
    }

//Chrome
    if (agent.indexOf("chrome") > 0) {
      return 'chrome';
    }

//Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      return 'safari';
    }

  }

  const browser = _global.getBrowserInfo();
  alert(browser);
  switch (browser) {
    case 'chrome':
    case 'firefox':
    {
      const getUserInfo = function (bridge) {
        bridge.registerHandler("GET_USER_INFO", function (userInfoStr, responseCallback) {
          //alert(userInfoStr);
          if (!userInfoStr) {
            alert('用户信息获取失败');
            return;
          }

          const _andoidInfo = JSON.parse(userInfoStr);
          const userInfo = _andoidInfo.userBean;

          _global.mobileIPPort = _andoidInfo.origin;
          _global.userInfo = userInfo;
          _global.userInfo.uid = userInfo.UserID;

        });
      }

      if (window.WebViewJavascriptBridge) {
        getUserInfo(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady'
          , function () {
            getUserInfo(WebViewJavascriptBridge);
          },
          false
        );
      }
    }
      break;
    case 'safari':
    {
      const getUserInfo = function (bridge) {
        bridge.registerHandler('GET_USER_INFO', function (data, responseCallback) {
          //alert(JSON.stringify(data));

          if (!data) {
            alert('用户信息获取失败');
            return;
          }
          _global.userInfo = data.userBean;
          _global.ipPort = data.origin;
          _global.userInfo.uid = data.userBean.UserID;

        })
      }
      if (window.WebViewJavascriptBridge) {
        getUserInfo(WebViewJavascriptBridge);
      } else if (window.WVJBCallbacks) {
        window.WVJBCallbacks.push(getUserInfo);
      } else {
        window.WVJBCallbacks = [getUserInfo];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      }
    }
      break;
    default:
    {
      alert('IE不支持');
    }
  }

})();
