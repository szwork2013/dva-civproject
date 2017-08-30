import * as EventDetailService from '../service/EventDetail'
export default {
  namespace: 'SelectPeople',
  state: {
    selectTree:[],
    FlowName:'',
    NodeName:'',
    station:'',
    rowData:{},
    scanTableMetaData:{},
    disPatchSuccess:''
  },
  reducers: {
    saveTree(state, {payload:{data:data,FlowName:FlowName,NodeName:NodeName,station:station,rowData:rowData,scanTableMetaData:scanTableMetaData}}){
      const selectTree = data

      return {...state,selectTree,FlowName,NodeName,station,rowData,scanTableMetaData};
    },
    saveDispatch(state,{payload:{success:success}}){
      let disPatchSuccess;
      if (success.statusCode === '1'){
        disPatchSuccess = true
      }else{
        disPatchSuccess = false
      }
      return{...state,disPatchSuccess}
    },
    initDispatch(state,{payload:disPatchsuccess}){
      return{...state,disPatchsuccess}
    }
  },
  effects: {

    *fetchTree({payload:FlowName,NodeName,station,rowData,scanTableMetaData}, {call,put}){
      const flowName = FlowName
      const data = yield call(EventDetailService.eventDispatchNode,flowName,station);
      yield put({type: 'saveTree', payload: {data,FlowName,NodeName,station,rowData,scanTableMetaData}});
    },
    *fetchDispatch({payload:data},{call,put}){
      const success = yield call(EventDetailService.eventDispatchUpload,data)
      yield put({type:'saveDispatch',payload:{success}})
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {
        const FlowName = query.FlowName
        const NodeName = query.NodeName
        const station  = query.Station
        const rowData = query.RowData
        const scanTableMetaData = query.ScanTableMetaData
        if (pathname === '/SelectPeople') {
          dispatch({
            type:'fetchTree',
            payload:FlowName,NodeName,station,rowData,scanTableMetaData
          })
        }
      });
    }
  },
};
