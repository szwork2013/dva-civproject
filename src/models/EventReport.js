import { routerRedux } from 'dva/router';
import * as EventReportService from '../services/EventReport';
export default {
  namespace: 'EventReport',
  state: {
    flowNodeMeta:{}
  },
  reducers: {
    save(state, {payload:{flowNodeMeta}}){
      return {...state, flowNodeMeta};
    }
  },
  effects: {
    *fetch({payload:{state:flowCenterData}}, {call,put}){
      const data = yield call(EventReportService.fetch,flowCenterData);
      const flowNodeMeta=data.getMe[0];
      yield put({type: 'save', payload: {flowNodeMeta}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
        if (pathname === '/EventReport') {
          dispatch({type: 'fetch', payload: {state}});
        }

      });
    }
  },
};
