import {request} from '../../../utils/request';

export function fetchTaskTable(bizName,taskCode) {

  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/Maintenance/${uid}/TaskTableInfo?bizName=${bizName}&taskCode=${taskCode}`;
  return request(url);
}
export function fetchFeedBack(bizTaskTable,bizFeedBackTable,bizName,taskCode) {

  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/Maintenance/${uid}/FeedBackInfo?bizTaskTable=${bizTaskTable}&bizFeedBackTable=${bizFeedBackTable}&bizName=${bizName}&taskCode=${taskCode}`;
  return request(url);
}
export function fetchStationTask(bizName,taskCode) {

  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface//Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/Maintenance/${uid}/StationTaskTableInfo?bizName=${bizName}&taskCode=${taskCode}`;
  return request(url);
}
export function fetchBuyList(caseNo) {

  const url = `${_global.ipPort}/CityInterface//Services/MapgisCity_PatrolRepair_Xinao/REST/CaseManageREST.svc/FetchUsedCaiGouOrderList?caseNo=${caseNo}`;
  return request(url);
}
export function fetchWuLiaoList(caseNo) {

  const url = `${_global.ipPort}/CityInterface/Services/MapgisCity_PatrolRepair_Xinao/REST/CaseManageREST.svc/FetchUsedWuliaoList?caseNo=${caseNo}`;
  return request(url);
}
export function fetchMaterialsList(caseNO,bizName) {

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/FetchUsedMaterials?caseNo=${caseNO}&bizName=${bizName}&filterValue=C`;
  return request(url);
}
