
import {post,request} from '../../../utils/request';
export function fetch(data) {
  const uid = _global.userInfo.uid;

  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/GetEventMetaData?userID=${uid}`;
  const  response = post(url,data);
  return response;
}

export function changeEventState(eventMainTable,eventCode,eventState,value) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/EventManage/EditEventState?eventMainTable=${eventMainTable}&eventCode=${eventCode}&eventState=${eventState}&opinion=${value}&_token=`
  return request(url)

}
export function checkEvnentCanClose(eventCode) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/GetEventFlowLog?eventCode=${eventCode}`
  return request(url)
}
export function eventDispatchSelect(flowName,nodeName) {
  const url =`${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/GetFlowNodeMeta?flowName=${flowName}&nodeName=${nodeName}&_token=`
  return request(url)
}
export function eventDispatchNode(flowName,station) {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/WFGetSecondNodeMenTreeByStation?flowName=${flowName}&userID=${uid}&station=${station}`
  return request(url)
}
export function eventDispatchUpload(data) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/PostFlowNodeData`
  return post(url,data)

}
export function eventSave(data,eventCode) {
  const url = `${_global.ipPort}/CityInterfaceServices/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/EditEventData?eventCode=${eventCode}`
  return post(url,data)

}
