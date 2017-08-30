import * as EventDetailService from '../service/EventDetail'
export default {
  namespace: 'EventDispatchDetail',
  state: {
    scanTableMetaData: {},
    selectTree:[],
    rowData:{},
    FlowName:'',
    NodeName:'',
    station:'',
    rowData:{},
    HandOverMode:'',
    disPatchSuccess:''
  },
  reducers: {
    save(state, {payload:{data:data,station:station,FlowName:FlowName,NodeName:NodeName,rowData:rowData,HandOverMode:HandOverMode}}){
      const scanTableMetaData = data.getMe[0]

      return {...state,scanTableMetaData,station,FlowName,NodeName,rowData,HandOverMode};
    },
    saveDispatch(state,{payload:{success:success}}){
      let disPatchSuccess;
      if (success.statusCode === '1'){
        disPatchSuccess = true
      }else{
        disPatchSuccess = false
      }
      return{...state,disPatchSuccess}
    }
  },
  effects: {
    *fetch({payload:{FlowName,NodeName,station,rowData,HandOverMode}}, {call,put}){
      const data = yield call(EventDetailService.eventDispatchSelect,FlowName,NodeName);
      yield put({type: 'save', payload: {data,station,FlowName,NodeName,rowData,HandOverMode}});
    },
    *fetchDispatch({payload:data},{call,put}){
      const success = yield call(EventDetailService.eventDispatchUpload,data)
      yield put({type:'saveDispatch',payload:{success}})
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
        const FlowName = query.FlowName
        const NodeName = query.NodeName
        const station = query.station
        const HandOverMode = query.HandOverMode
        const rowData = JSON.parse(query.RowData)
        if (pathname === '/EventDispatchDetail') {
          dispatch({
            type:'fetch',
            payload:{FlowName,NodeName,station,rowData,HandOverMode},
          })
        }


      });
    }
  },
};
