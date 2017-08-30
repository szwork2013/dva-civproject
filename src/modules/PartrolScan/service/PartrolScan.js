import {request} from '../../../utils/request';

export function fetch(pageIndex,dateFrom,dateTo,station,creator,partroler,checkState) {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/MapGISCitySvr_Patrol_Standard/REST/PatrolStandardRest.svc/FetchTasklist?_mid=4440&pageIndex=${pageIndex}&pageSize=20&sortFields=createTime&direction=desc&name=&type=&regName=&filter=&dateFrom=${dateFrom}&dateTo=${dateTo}&station=${station}&description=&creator=${creator}&patroler=${partroler}&checkState=${checkState}&myUser=&fresh=0.8834879877977073&userName=`;
  return request(url);
}
