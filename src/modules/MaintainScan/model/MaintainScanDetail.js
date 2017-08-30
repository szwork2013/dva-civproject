import * as MaintainDetailService from '../service/MainTainScanDetail'
export default {
  namespace: 'MaintainScanDetail',
  state: {
    rowData:{},
    TableMetaDatas:[],
    TabDataDictionary:{}


  },
  reducers: {
    save(state, {payload:{data:data,tabName}}){
      const TableMetaDatas = data
      const TabDataDictionary = state.TabDataDictionary
      TabDataDictionary[tabName] = data


      return {...state,TableMetaDatas,TabDataDictionary};
    },
    saveRowData(state, {payload:rowData}){
      return {...state,rowData}
    },
  },
  effects: {
    /*任务详情*/
    *fetchFeedback({payload:rowData,tabName}, {call,put}){

      const bizTaskTable = rowData.BizTaskTable
      const bizFeedBackTable = rowData.BizFeedbackTable
      const bizName = rowData.BizName
      const taskCode = rowData.TaskCode

      const data = yield call(MaintainDetailService.fetchFeedBack,bizTaskTable,bizFeedBackTable,bizName,taskCode)
      yield put({type:'save',payload:{data,tabName}})
    },
    /*设备详情*/
    *fetchStationTask({payload:rowData,tabName}, {call,put}){
      const bizName = rowData.BizName
      const taskCode = rowData.TaskCode

      const data = yield call(MaintainDetailService.fetchStationTask,bizName,taskCode)
      yield put({type:'save',payload:{data,tabName}})
    },
    /*台账信息*/
    *fetchTaskTable({payload:rowData,tabName}, {call,put}){
      const bizName = rowData.BizName
      const taskCode = rowData.TaskCode

      const data = yield call(MaintainDetailService.fetchTaskTable,bizName,taskCode)
      yield put({type:'save',payload:{data,tabName}})
    },
    /*物料详情*/
    *fetchWuliao({payload:rowData,tabName}, {call,put}){
      const caseNo = rowData.CaseNo


      const data = yield call(MaintainDetailService.fetchWuLiaoList,caseNo)
      yield put({type:'save',payload:{data,tabName}})
    },
    /*材料详情*/
    *fetchMaterial({payload:rowData,tabName}, {call,put}){
      const bizName = rowData.BizName
      const caseNo = rowData.CaseNo

      const data = yield call(MaintainDetailService.fetchMaterialsList,caseNo,bizName)
      yield put({type:'save',payload:{data,tabName}})
    },
    /*采购详情*/
    *fetchCaiGou({payload:rowData,tabName}, {call,put}){
      const caseNo = rowData.CaseNo

      const data = yield call(MaintainDetailService.fetchBuyList,caseNo)
      yield put({type:'save',payload:{data,tabName}})
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {

        const rowData = query;
        if (pathname === '/MaintainScanDetail') {
          dispatch({
            type:'saveRowData',
            payload:rowData,
          })
        }
      });
    }
  },
};
