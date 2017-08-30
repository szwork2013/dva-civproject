/**
 * Created by lyunfan on 17/4/17.
 */
import {post} from '../utils/request';
export function fetch(data) {
  const uid = _global.userInfo.uid;

  if(!uid){
    throw new Error('用户已掉线');
    return;
  }
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/GetBizMetaData`;
  return post(url,data);
}


