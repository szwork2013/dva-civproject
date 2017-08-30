import * as MainTainScanService from '../service/MainTainScan';

export default {
  namespace: 'MaintainScanList',
  state: {
    pageIndex:1,
    dataList: [],
    isLoading: false,
    totalRcdNum: 0,
    isFinish: false,
    direction: '',
    bizName: '',
    dateFrom:'',
    dateTo:'',
    checkState:'',
    stationName:'',
    equipmentType:'',
    totalRcdNum:'',
    listDictionary:{},
    cureMan:'',
    area:''

  },
  reducers: {
    save1(state, {payload:{data:data,isRefresh,bizName}}){
      //var dataList=data.getMe;
      const isLoading = false;
      let pageIndex=state.pageIndex;
      let dataList = [];
      if (isRefresh) {
        dataList = data.getMe;
        pageIndex=1;
      } else {
        dataList = [...state.dataList, ...data.getMe];
        pageIndex++;
      }
      const totalRcdNum = data.totalRcdNum;
      const listDictionary = state.listDictionary;
      listDictionary[bizName] = dataList;

      return {...state,isLoading, dataList, totalRcdNum,pageIndex,listDictionary};
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
    *fetch1({payload:pageIndex,direction,dateFrom,dateTo,checkState,stationName,equipmentType,BIZNAME}, {call,put}){
      const bizName = BIZNAME;

      yield put({type: 'setIsLoading', payload: {}});
      const data = yield call(MainTainScanService.fetchMaintainScanList1, pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType);
      const isRefresh = pageIndex == 1;
      yield put({type: 'save1', payload: {data,isRefresh,bizName}});

    },
    *fetch2({payload:pageIndex,BIZNAME,dateFrom,dateTo,checkState,cureMan,area}, {call,put}){
      const bizName = BIZNAME;

      yield put({type: 'setIsLoading', payload: {}});
      const data = yield call(MainTainScanService.fetchMaintainScanList2, pageIndex,bizName,dateFrom,dateTo,checkState,cureMan,area);
      const isRefresh = pageIndex == 1;
      yield put({type: 'save1', payload: {data,isRefresh,bizName}});

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {

      });
    }
  },
};
