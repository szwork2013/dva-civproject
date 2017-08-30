/**
 * Created by lyunfan on 17/5/3.
 */
import {post,request} from '../utils/request';



export function save({caseInfo,flowNodeMeta}) {

  flowNodeMeta.Modules = [];
  const data = {caseInfo, flowNodeMeta};

  let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/SaveFlowNodeData`;

  return post(url, data);
}

export function saveImgs(data) {

  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/threepart/UploadBase64ImgResource`;
  return post(url, data);

}
export function handOverSelf({flowInfoPostParam}) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/PostFlowNodeData`;
  return post(url, flowInfoPostParam);
}

export function getHandOverTree({caseInfo}) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetHandoverTreeForWeb`;
  return post(url, caseInfo);
}

export function getStationListByUserID(){
  const url=`${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/CommonModule/GetStationListByUserID?userID=${_global.userInfo.uid}`;
  return request(url);
}

export function getDataDictionaryList(nodeNameArr){
  const url=`${_global.ipPort}/CityInterface/Services/MapgisCity_WorkFlow/REST/WorkFlowREST.svc/GetDataDictionaryList?nodeNameArr=${nodeNameArr}`;
  return request(url);
}
export function getMenTreeByRole(role){
  const url=`${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetMenTreeByRole?role=${role}&userID=${_global.userInfo.uid}`;
  return request(url);
}

