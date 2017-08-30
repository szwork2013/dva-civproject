/**
 * Created by lyunfan on 17/4/17.
 */
import {request} from '../utils/request';
import {post} from '../utils/request';
const pageSize = 10;
export function fetch(page,flowName, nodeName,keyword) {
  const uid = _global.userInfo.uid;

  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  if(!page){
    throw new Error('当前页码错误');
    return;
  }
  flowName=flowName||'';
  nodeName=nodeName||'';
  keyword=keyword||'';

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/
  CaseBox/${uid}/StardEventDoingBox?flowName=${flowName}&flowNodeName=${nodeName}&pageIndex=${page}&pageSize=${pageSize}&eventInfo=${keyword}&sortFields=ID0&direction=desc`;
  return request(url);
}


