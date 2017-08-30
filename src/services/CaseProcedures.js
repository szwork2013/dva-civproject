/**
 * Created by lyunfan on 17/4/17.
 */

import {request} from '../utils/request';
export function fetch({CaseNo}) {
  let url = `${_global.ipPort}/CityInterface/Services/MapgisCity_WorkFlow/REST/WorkFlowREST.svc/WorkFlow/FetchCaseProcedure
   ?caseNo=${CaseNo}`;
  return request(url);
}
