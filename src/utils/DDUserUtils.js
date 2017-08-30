/**
 * Created by lyunfan on 17/5/24.
 */
import  {request} from '../utils/request';
import {Toast} from 'antd-mobile';
export function getUserInfo(callBack) {

  let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/dd/GetConfig`;

  const data=request(url,'json',function(data){
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

            let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/dd/GetWUserUserBean?code=${code}`;
            return request(url,'json',callBack);

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
