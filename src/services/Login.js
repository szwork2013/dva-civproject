import { request } from '../utils/request';

export function fetch(userName, passWord) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/BaseREST.svc`
    + `/UserLogin?userName=${userName}&password=${passWord}&deviceid=3.7.0802web&serialnumber=1`;

  return request(url);
}

export function generateToken(userName, passWord) {
  const url = `${_global.ipPort}/cityinterface/rest/services.svc/generatetoken?username=${userName}&password=${passWord}&client=mobile&expiration=43200`;
  return request(url);
}

export function getUserInfo(token) {
  const url = `${_global.ipPort}/CityInterface/rest/services.svc/getUserInfo?token=${token}`;
  return request(url);
}

export function getConfigData(token) {
  const url = `${_global.ipPort}/CityInterface/rest/services/ConfigCenter.svc/mobile/ConfigData/config.xml?token=${token}`;
  return request(url);
}
