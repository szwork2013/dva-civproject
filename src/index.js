import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
//import createLogger from 'redux-logger';
//import createLoading from 'dva-loading';
import { Toast } from 'antd-mobile';
import { request } from './utils/request';
window._global = window._global || {};

//import createLogger from 'redux-logger';
// 1. Initialize
const app = dva({
  initialState: {},
  onError(e) {
    Toast.info(e.message, 1);
  },
  history: useRouterHistory(createHashHistory)({ queryKey: true }),
  // onAction: createLogger()
}
);

// 2. Plugins
// app.use({});
//app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/AppIndex'));

// 4. Router
app.router(require('./router'));

// 5. Start
//app.start('#root');
if (_global.isabled) {
  if (_global.isDebug) {
    app.start('#bizContainer');

  } else {
    if ((_global.userInfo && _global.userInfo.uid) || _global.userName) {
      app.start('#bizContainer');
    } else {
      //alert('从android获取用户信息');
      switch (_global.channel) {
        case 'ios':
          {

            const getUserInfo = function (bridge) {
              bridge.registerHandler('GET_USER_INFO', function (data, responseCallback) {
                //alert(JSON.stringify(data));

                if (!data) {
                  Toast.fail('用户信息获取失败', 2);
                  return;
                }
                _global.userInfo = data.userBean;
                _global.ipPort = data.origin;
                _global.userInfo.uid = data.userBean.UserID;

                app.start('#bizContainer');
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
        case 'android':
          {

            const getUserInfo = function (bridge) {
              bridge.registerHandler("GET_USER_INFO", function (userInfoStr, responseCallback) {
                //alert(userInfoStr);
                if (!userInfoStr) {
                  Toast.fail('用户信息获取失败', 2);
                  return;
                }

                const _andoidInfo = JSON.parse(userInfoStr);
                const userInfo = _andoidInfo.userBean;

                _global.mobileIPPort = _andoidInfo.origin;
                _global.userInfo = userInfo;
                _global.userInfo.uid = userInfo.UserID;

                app.start('#bizContainer');
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
        case 'dd':
          {

            const getUserInfo = function (callBack) {
              let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/dd/GetConfig`;

              const data = request(url, 'json', function (data) {
                if (!data) {
                  Toast.offline('网络或服务异常', 2);
                  return;
                }
                if (data.ResultCode <= 0) {
                  Toast.fail(data.ResultMessage, 2);
                  return;
                }
                const corpId = data.DataList[0];
                //alert(corpId);
                dd.ready(function () {

                  dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function (result) {
                      const code = result.code;
                      //alert(code);
                      let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/dd/GetWUserUserBean?code=${code}`;
                      return request(url, 'json', callBack);

                    },
                    onFail: function (err) {
                      // alert(err);
                      //throw (JSON.stringify(err));
                      alert(JSON.stringify(err));
                    }

                  });

                }
                );

              });
            }

            getUserInfo(function (data) {
              if (!data) {
                Toast.offline('网络或服务异常', 2);
                return;
              }
              if (data.ResultCode <= 0) {
                Toast.fail(data.ResultMessage, 2);
                return;
              }
              const userInfo = data.DataList[0];
              //alert(JSON.stringify(userInfo));
              _global.setLocalStorage('userInfo', userInfo);

              _global.userInfo = userInfo;
              _global.userInfo.uid = _global.userInfo.UserID;

              app.start('#bizContainer');
            });
          }
          break;
        case 'wx':
          {
            //alert(_global.wxCode);
            if (_global.wxCode) {

              const getUserInfo = function (callBack) {
                let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/WX/GetWXUserUserBean?code=${_global.wxCode}`;
                //alert(url);
                const data = request(url, 'json', function (data) {
                  //alert(JSON.stringify(data));
                  if (!data) {
                    alert('网络或服务异常');
                    return;
                  }
                  if (data.ResultCode <= 0) {
                    Toast.fail(data.ResultMessage, 2);
                    return;
                  }
                  callBack(data);
                });

              }
              getUserInfo(function (data) {
                const userInfo = data.DataList[0];
                //alert(JSON.stringify(userInfo));
                _global.setLocalStorage('userInfo', userInfo);

                _global.userInfo = userInfo;
                _global.userInfo.uid = _global.userInfo.UserID;

                app.start('#bizContainer');
              });
            } else {

              const getWXConfig = function (callBack) {
                let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/WX/GetWXConfig`;
                //alert(url);
                const data = request(url, 'json', function (data) {
                  if (!data) {
                    alert('网络或服务异常');
                    return;
                  }
                  if (data.ResultCode <= 0) {
                    alert(data.ResultMessage);
                    return;
                  }
                  const corpId = data.DataList[0];
                  const corpsecret = data.DataList[1];
                  const agentid = data.DataList[2];
                  //alert(corpId);
                  //alert(JSON.stringify(data));
                  callBack(corpId, corpsecret, agentid);
                });
              }
              getWXConfig(function (corpId, corpsecret, agentid) {

                //alert(_global.href);
                const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${_global.href}&response_type=code&scope=snsapi_userinfo&agentid=${agentid}#wechat_redirect`;
                //alert(url);
                window.location.href = url;
              });
            }
          }
          break;
        case 'web':
          app.start('#bizContainer');
          break
      }

    }
  }
}

