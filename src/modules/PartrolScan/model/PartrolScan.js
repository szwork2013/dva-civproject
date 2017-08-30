import * as PartrolScanCasesService from '../service/PartrolScan';

export default {
  namespace: 'PartrolScan',
  state: {
    PageIndex:1,
    dataList: [],
    isLoading: false,
    totalRcdNum: 0,
    isFinish: false,
    dateFrom:'',
    dateTo:'',
    station:'',
    creator:'',
    partroler:'',
    checkState:'',
    type:'',
    rowData:{},
  },
  reducers: {
    save(state, {payload:{data:data,isRefresh}}){
      //var dataList=data.getMe;
      const isLoading = false;
      let PageIndex=state.PageIndex;
      let dataList = [];
      if (isRefresh) {
        dataList = data.getMe;
        PageIndex=1;
      } else {
        dataList = [...state.dataList, ...data.getMe];
        PageIndex++;
      }
      const totalRcdNum = data.totalRcdNum;
      //state.curPage++;
      //state.dataList = state.dataList.concat(data.getMe);
      return {...state,isLoading, dataList, totalRcdNum,PageIndex};
    },
    setIsLoading(state, {payload:{}}){
      const isLoading = true;
      return {...state, isLoading};
    },
    setFinish(state, {payload:{}}){
      const isFinish = true;
      return {...state, isFinish};
    },
    initData(state, {payload:flowName,nodeName}){
      return {...state, flowName, nodeName};
    }
  },
  effects: {
    *fetch({payload:pageIndex,dateFrom,dateTo,station,creator,partroler,checkState,type}, {call,put}){

      yield put({type: 'setIsLoading', payload: {}});
      const data = yield call(PartrolScanCasesService.fetch,pageIndex,dateFrom,dateTo,station,creator,partroler,checkState);
      const isRefresh = pageIndex == 1;
      yield put({type: 'save', payload: {data,isRefresh}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if (pathname === '/PartrolScan') {
          let start = '',dateFrom = '',dateTo = '',station = '',creator = '',partroler = '',checkState = ''
          dispatch({type: 'fetch', payload: 1,start,dateTo,dateFrom,station,creator,partroler,checkState});
        }

      });
    }
  },
};
