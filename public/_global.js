/**
 * Created by lyunfan on 17/6/7.
 */
(function (document, bizContainer, $) {
  window._global = window._global || {};
  //全局基本方法
  _global.setLocalStorage = function (key, vaule) {
    if (!key) {
      return;
    }

    if (!vaule) {
      return;
    }
    return localStorage.setItem(key, JSON.stringify(vaule));
  }

  _global.getLocalStorage = function (key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val) || '';
  }

  _global.delLocalStorage = function (key) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }

  _global.dynamicAppendjs = function (path) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = path;

    head.appendChild(script);
  }
  _global.isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  // _global.toUnicode = function (str) {  return
  // escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u'); }
  //
  // _global.toGB2312 = function (str) {  return unescape(str.replace(/\\u/gi,
  // '%u')); } 全局变量设置
  _global.isDebug = true;
  _global.isabled = false;
  _global.channel = 'debug';
  _global.mobileIPPort = '';
  _global.invokeMapCount = 0;
  _global.isHideNav = false;
  _global.href = window.location.href;

  //兼容Web4的奇怪处理
  (function () {
    if (_global.href.indexOf('/mobile') > -1) {
      $('html').css('font-size', '50px');

      window.addEventListener("popstate", function () {
        if (top.document.getElementById("WebApp").style.visibility == "visible") {
          //alert(2);
          return;
        }

        //alert(3);
        top.document.getElementById("WebApp").style.visibility = "visible";
        top.document.getElementsByClassName('viewContainer')[0].style.visibility = "hidden";
      }, false);
    }
  })();

  //渠道控制
  (function () {
    var href = _global.href;

    var splitIndex = href.indexOf('?');

    var fromVal = 'web';
    var debugVal = '0';

    if (splitIndex >= 0) {
      var search = href.substr(splitIndex + 1);
      var searchParams = search.split('&');

      for (var i = 0; i < searchParams.length; i++) {
        var kv = searchParams[i].split('=');

        switch (kv[0]) {
          case 'from':
            fromVal = kv[1] || 'debug';
            break;
          case 'debug':
            debugVal = kv[1] || '0';
            break;
          case 'code':
            _global.wxCode = kv[1] || '';

            fromVal = 'wx';
            break;
          case 'userName':
            _global.userName = kv[1] || '';
            break;
        }
      }
    }

    if (!_global.isDebug && (fromVal == 'debug' || debugVal == '1')) {
      _global.isDebug = true;
    }

    if (_global.isDebug) {
      _global.isabled = true;
      _global.channel = fromVal ? fromVal : "debug";

      return;
    }

    if (!fromVal) {
      alert('缺少渠道from配置，将以调试模式运行');
      _global.isDebug = true;
      _global.isabled = true;
      _global.channel = 'debug';

      return;
    }

    switch (fromVal) {
      case 'dd':
        {
          _global.dynamicAppendjs('dingtalk.js');
          _global.isabled = true;
        }
        break;
      case 'wx':
      case 'ios':
      case 'android':
      case 'mobile':
      case 'debug':
      case 'web':
        {
          _global.isabled = true;
        }
        break;
      default:
        {
          alert('目前仅支持钉钉,微信，IOS原生嵌入，Android原生嵌入');
        }
    }

    if (_global.isabled) {
      _global.channel = fromVal;
    }

  })();

  //基本信息初始化
  (function () {
    if (_global.isDebug) {
      //_global.ipPort = 'https://pipenet.enn.cn:8000/changsha';
       _global.ipPort = 'http://192.168.12.6:8091';
      _global.UpLoadFiles = _global.ipPort + '/buffile/OutFiles/UpLoadFiles/';
      _global.userInfo = {
        "Department": "管理员的平台",
        "FullRole": "CS管理员,手持管理员,业务系统管理员,运维管理登录权限,工单中心,站点_河西",
        "GroupCode": 0,
        "Icon": "default_user.png",
        "IsAdmin": false,
        "IsOnline": true,
        "LoginCount": 10502,
        "LoginName": "admin",
        "LoginTime": "2017\/6\/7 17:36:46",
        "MAC_Address": null,
        "PatrolPlanID": 2,
        "Role": "CS管理员,webgis管理员,工单中心,管理员的平台,业务系统管理员,运维管理登录权限,站点_河西",
        "TelPhone": null,
        "TrueName": "吴文俊",
        "UserID": 1
      };
      _global.userInfo.uid = _global.userInfo.UserID;
    } else {
      _global.ipPort = window.location.origin;

      //兼容新奥模式
      const pre_href = window.location.href.split('#')[0].toLowerCase();
      var pre_citywebfw = '';

      if (pre_href.indexOf('citywebfw') > -1) {
        pre_citywebfw = pre_href.split('citywebfw')[0];
        pre_citywebfw = pre_citywebfw.substr(0, pre_citywebfw.length - 1);
      }

      _global.ipPort = pre_citywebfw || _global.ipPort;

      //测试阶段 https://pipenettest.enn.cn:8800/dongguan/buffile/WebApp/#?from=wx
      if (pre_citywebfw.indexOf('buffile') > -1) {
        pre_citywebfw = pre_citywebfw.split('buffile')[0];
        pre_citywebfw = pre_citywebfw.substr(0, pre_citywebfw.length - 1);
        _global.ipPort = pre_citywebfw || _global.ipPort;
      }

      _global.UpLoadFiles = _global.ipPort + '/buffile/OutFiles/UpLoadFiles/';

      if (_global.channel == 'wx') {
        if (!_global.wxCode) {
          alert('未取到微信CODE值');

          return;
        }

        var url = _global.ipPort + '/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/WX/GetWXUserUserBean';

        $.ajax({
          type: 'GET',
          async: false,
          url: url,
          data: {
            "code": _global.wxCode
          },
          success: function (response, options) {
            if (response.ResultCode <= 0) {
              alert(response.ResultMessage);

              return;
            }

            _global.userName = response.DataList[0];
          },
          error: function (response, options) {
            alert(JSON.stringify(response));
          }
        });

        if (!_global.userName)
          return;
      }

      const userInfo = _global.getLocalStorage("userInfo");

      if (userInfo) {
        _global.userInfo = userInfo;

        if (_global.userInfo.UserID) {
          _global.userInfo.uid = _global.userInfo.UserID;
        }
      }
    }
  })();

  //地图控制
  (function () {
    switch (_global.channel) {
      case 'debug':
      case 'dd':
      case 'wx':
      case 'web':
        {
          _global.dynamicAppendjs('mapUtils.js');
          _global.isabled = true;

          var state = { title: "首页", url: "#" };
          window.history.pushState(state, state.title, state.url);

          window.addEventListener("popstate", function (e) {

            if (_global.isMapShow()) {
              _global.hideMap();
              if (_global.invokeMapCount > 0) {
                window.history.forward(1);
              }
              _global.invokeMapCount++;
            }

          }, false);
        }
        break;
      case 'android':
      case 'ios':
      case 'mobile':
        {
          _global.dynamicAppendjs('mobile_mapUtils.js');
          _global.isabled = true;
          _global.isHideNav = true;
        }
        break;
      default:
        {
          // alert('目前仅支持钉钉,微信，IOS原生嵌入，Android原生嵌入');
        }
    }
  })();
})(document, document.getElementById('bizContainer'), $);
