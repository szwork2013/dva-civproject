/**
 * Created by lyunfan on 17/4/17.
 */
import {request} from '../utils/request';
export function fetch(page,flowName, nodeName) {
  const uid = _global.userInfo.uid;

  if(!uid){
    throw new Error('用户已掉线');
    return;
  }

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/CaseBox/${uid}/GetFlowCenterData?type=mobile`;
  return request(url);
}


