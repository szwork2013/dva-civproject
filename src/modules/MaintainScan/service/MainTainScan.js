import {request} from '../../../utils/request';

export function fetchBizNameList() {

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/FetchYHBizNames`;
  return request(url);
}
export function fetchMaintainScanList1(pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType) {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url =`${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/Maintenance/${uid}/StationScheduleTasks?_mid=&pageIndex=${pageIndex}&pageSize=10&sortFields=开始时间&direction=${direction}&bizName=${bizName}&dateFrom=${dateFrom}&dateTo=${dateTo}&checkState=${checkState}&taskCodes=&taskInfo=&stationName=${stationName}&equipmentType=${equipmentType}&partType=`
  return request(url)
}
export function fetchMaintainScanList2(pageIndex,bizName,dateFrom,dateTo,checkState,cureMan,area) {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/Maintenance/${uid}/ScheduleTasks?_mid=&pageIndex=${pageIndex}&pageSize=20&sortFields=开始时间&direction=desc&bizName=${bizName}&area=${area}&dateFrom=${dateFrom}&dateTo=${dateTo}&checkState=${checkState}&cureMan=${cureMan}&taskInfo=`
  return request(url)
}


