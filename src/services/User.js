import {request} from '../utils/request';

export function fetch() {
  const uid = _global.userInfo.uid;
  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/BaseREST.svc/GetUserMenuList?UserID=${uid}`;
  return request(url);
}
