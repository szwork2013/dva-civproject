/**
 * Created by lyunfan on 17/4/17.
 */

import {request,post} from '../utils/request';
//export function fetch(FlowName, CaseNo, NodeName, EventCode) {
//  let url = `${global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetFlowInfo
//  ?flowName=${FlowName}&caseNo=${CaseNo}&nodeName=${NodeName}&eventCode=${EventCode}`;
//  return request(url);
//}

export function fetch(FlowName, CaseNo, NodeName, EventCode) {

  const url=`${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetFlowTableInfo
  ?flowName=${FlowName}&caseNo=${CaseNo}&nodeName=${NodeName}&eventCode=${EventCode}`;

  return request(url);
}

export function caseHandBack(data) {
  let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/CaseHandBack`;
  return post(url,data,'text');
}
export function caseFinish(flowInfoPostParam) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/PostFlowNodeData`;
  return post(url, flowInfoPostParam);
}

export function setHasRead(caseInfo){

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/ReadCase`;

  return post(url,caseInfo);

}

export function getUserBeanByuid(uid){

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/threepart/GetUserInfoByUid?uid=${uid}`;
  return request(url);

}

export function getCurCaseItem(eventCode,caseNo){

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/EventManage/GetCurCaseDetailInfo?eventCode=${eventCode}&caseNo=${caseNo}`;
  return request(url);

}
