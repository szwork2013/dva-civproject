import {request} from '../../../utils/request';

export function fetch(pageIndex,start,end,eventState,eventName) {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/EventManage/GetEventBoxWithPaging?pageSize=10&pageIndex=${pageIndex}&userID=${uid}&dateFrom=${start}&dateTo=${end}&eventState=${eventState}&eventName=${eventName}&sortFields=更新时间&direction=desc`;
  return request(url);
}
