import {request} from '../../../utils/request';


export function PartrolList(station,dateFrom,dateTo) {

  const url = `${_global.ipPort}/CityInterface/Services/MapGISCitySvr_Patrol_Standard/REST/PatrolStandardRest.svc/PersonnelWorkReport?station=${station}&userName=&dateFrom=${dateFrom}&sysType=业务系统&dateTo=${dateTo}&_token=341`;
  return request(url);
}
