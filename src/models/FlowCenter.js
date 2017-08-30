import { routerRedux } from 'dva/router';
import * as FlowCenterService from '../services/FlowCenter';
export default {
  namespace: 'FlowCenter',
  state: {
  },
  reducers: {
    save(state, {payload:{dic:eventDic}}){
      return {...state, eventDic};
    }
  },
  effects: {
    *fetch({payload:{}}, {call,put}){
      const data = yield call(FlowCenterService.fetch);

      const dic = {};
      const getMe = data.getMe;
      for (let i = 0; i < getMe.length; i++) {
        const event = getMe[i];

        const eventType = event.BusinessType;

        const eventVal = dic[eventType];

        if (!eventVal) {
          dic[eventType] = [];
        }

        dic[eventType].push(event);
      }
      yield put({type: 'save', payload: {dic}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
        if (pathname === '/FlowCenter') {
          dispatch({type: 'fetch', payload: {}});
        }
      });
    }
  },
};
