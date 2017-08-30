import * as PartrolCasesService from '../service/PartrolCases'
export default {
  namespace: 'PartrolCases',
  state: {
    DataList: [],
    dateFrom:'',
    dateTo:'',
    station:''
  },
  reducers: {
    save(state, {payload:{data:data}}){
      const DataList = data.getMe[0].list

      return {...state,DataList};
    },
  },
  effects: {
    *fetch({payload:{station,dateFrom,dateTo}}, {call,put}){
      const data = yield call(PartrolCasesService.PartrolList,station,dateFrom,dateTo);
      yield put({type: 'save', payload: {data}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {
        const station = ''
        const dateFrom = ''
        const dateTo = ''
        if (pathname === '/PartrolCount') {
          dispatch({
            type:'fetch',
            payload:{station,dateFrom,dateTo},
          })
        }
      });
    }
  },
};
