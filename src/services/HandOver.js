/**
 * Created by lyunfan on 17/5/3.
 */
import {post} from '../utils/request';

export function getHandOverTree(caseInfo) {
  if (!caseInfo) {
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetHandoverTreeForWeb`;
  return post(url, caseInfo);
}

export function handOver(flowInfoPostParam) {

  if (!flowInfoPostParam) {
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/PostFlowNodeData`;
  return post(url, flowInfoPostParam);
}
