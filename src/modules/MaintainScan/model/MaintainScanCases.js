import * as MaintainService from '../service/MainTainScan'
export default {
  namespace: 'MaintainScanCases',
  state: {
    DataList: [],

  },
  reducers: {
    save(state, {payload:{data:data}}){
      const DataList = data.DataList

      return {...state,DataList};
    },
  },
  effects: {
    *fetch({payload:{}}, {call,put}){
      const data = yield call(MaintainService.fetchBizNameList);
      yield put({type: 'save', payload: {data}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {

        if (pathname === '/MaintainScan') {
          dispatch({
            type:'fetch',
            payload:{},
          })
        }
      });
    }
  },
};
