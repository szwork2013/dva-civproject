import  {request} from '../utils/request';

export function getUserInfo(callBack) {

  let href = window.location.href.substr(0, 32);

  const splitIndex = href.indexOf('#');
  if (splitIndex >= 0) {
    href = href.substr(0, splitIndex);
  }

  let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/dd/GetSignInfo
  ?appName=${_global.appName}&url=${href}`;
  request(url,'json', function (data) {
    let ddSignInfo = data.DataList[0];
    // alert(JSON.stringify(ddSignInfo));
    dd.config({
      agentId: ddSignInfo.agentId, // 必填，微应用ID
      corpId: ddSignInfo.corpId,//必填，企业ID
      timeStamp: ddSignInfo.timeStamp, // 必填，生成签名的时间戳
      nonceStr: ddSignInfo.nonceStr, // 必填，生成签名的随机串
      signature: ddSignInfo.signature, // 必填，签名
      jsApiList: ['biz.user.get', 'ui.pullToRefresh.stop', 'biz.util.openLink', 'biz.navigation.setLeft', 'biz.navigation.setTitle', 'biz.navigation.setRight'] // 必填，需要使用的jsapi列表
    });


    dd.ready(function () {

        dd.runtime.permission.requestAuthCode({
          corpId: ddSignInfo.corpId,
          onSuccess: function(result) {
            alert(JSON.stringify(result));
            /*{
             code: 'hYLK98jkf0m' //string authCode
             }*/
          },
          onFail : function(err) {
            // alert(err);
            //throw (JSON.stringify(err));
            alert(JSON.stringify(err));
          }

        });

        //dd.biz.user.get({
        //  onSuccess: function (info) {
        //    //logger.e('userGet success: ' + JSON.stringify(info));
        //    //callback(info.userid);
        //    //alert(JSON.stringify(info));
        //    const trueName = info.nickName;
        //    const url = `${global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/threepart/GetUserInfoByTrueName
        //              ?trueName=${trueName}`;
        //    getCallBack(url, function (data) {
        //      //alert(123);
        //      callBack(data);
        //    });
        //    //alert(JSON.stringify(info));
        //  },
        //  onFail: function (err) {
        //    //logger.e('userGet fail: ' + JSON.stringify(err));
        //    // alert(err);
        //    //alert(JSON.stringify(err));
        //    // throw (JSON.stringify(err));
        //  }
        //});

      }
    );

    //alert(123);
  });
}
