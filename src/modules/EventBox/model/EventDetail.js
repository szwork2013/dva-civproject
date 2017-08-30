import * as EventDetailService from '../service/EventDetail'
export default {
  namespace: 'EventDetail',
  state: {
    scanTableMetaData: {},
    rowData:{},
    EditFileds:'',
    stateChangeSuccess:'',
    FlowConfigArr:[],
  },
  reducers: {
    save(state, {payload:{data:data}}){
      const scanTableMetaData = data.getMe[0].EventInfo
      const EditFileds = data.getMe[0].EditableFields
      const FlowConfigArr = data.getMe[0].FlowInfoConfig


      return {...state,scanTableMetaData,EditFileds,FlowConfigArr};
    },
    saveRowData(state, {payload:rowData}){
      return {...state,rowData}
    },
    saveChangeState(state,{payload:statusCode}){
      if (statusCode == ''){
        const stateChangeSuccess = '';
        return {...state,stateChangeSuccess}
      }
      if(statusCode =="0000"){
        const stateChangeSuccess = 'success';
        return {...state,stateChangeSuccess}
      }else {
        const stateChangeSuccess = 'false';
        return {...state,stateChangeSuccess}
      }

    }

  },
  effects: {
    *fetch({payload:caseItem}, {call,put}){
      const data = yield call(EventDetailService.fetch, caseItem);
       yield put({type: 'save', payload: {data}});
    },
    *changeEventState({payload:eventMainTable,eventCode,eventState,value},{call,put}){
      const data = yield call(EventDetailService.changeEventState,eventMainTable,eventCode,eventState,value)
      const statusCode = data.statusCode
      yield  put({type: 'saveChangeState',payload:statusCode})
    },
    *checkEventCanClose({payload:eventMainTable,eventCode,eventState},{call,put}){
      const data = yield call(EventDetailService.checkEvnentCanClose,eventCode)
      const getArr = data.getMe
      let canClose = 1;
      for (var item in getArr){
        if (item.IsOver === '0'){
          canClose  = 0
          break
        }
      }
      if (canClose === 1){
       // changeEventState({payload:eventMainTable,eventCode,eventState,value})
        yield put({type: 'changeEventState',payload:eventMainTable,eventCode,eventState,eventCode})
      }


    },
    *saveCaseData({payload:data,station},{call,put}){
       const saveMessage = yield call(EventDetailService.eventSave,data,station)
       yield put
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {
        const rowData = query
        if (pathname === '/EventDetail') {
          dispatch({
            type:'saveRowData',
            payload:rowData
          })
          dispatch({
            type:'fetch',
            payload:query,
          })
        }
      });
    }
  },
};
