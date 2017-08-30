import * as EventCasesService from '../service/EventCases';

export default {
  namespace: 'EventCases',
  state: {
    curPage:1,
    dataList: [],
    isLoading: false,
    totalRcdNum: 0,
    isFinish: false,
    start: '',
    end: '',
    eventName:'',
    eventState:'',
    rowData:{},
  },
  reducers: {
    save(state, {payload:{data:data,isRefresh}}){
      //var dataList=data.getMe;
      const isLoading = false;
      let curPage=state.curPage;
      let dataList = [];
      if (isRefresh) {
        dataList = data.getMe;
        curPage=1;
      } else {
        dataList = [...state.dataList, ...data.getMe];
        curPage++;
      }
      const totalRcdNum = data.totalRcdNum;
      //state.curPage++;
      //state.dataList = state.dataList.concat(data.getMe);
      return {...state,isLoading, dataList, totalRcdNum,curPage};
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
    *fetch({payload:page,start,end,eventName,eventState}, {call,put}){

      yield put({type: 'setIsLoading', payload: {}});
      const data = yield call(EventCasesService.fetch, page, start,end,eventName,eventState);
      const isRefresh = page == 1;
      yield put({type: 'save', payload: {data,isRefresh}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname}) => {
        if (pathname === '/EventBox'||pathname === '/调度箱'||pathname==encodeURI('/调度箱')) {
          let start = '',end = '',eventName='',eventState=''
          dispatch({type: 'fetch', payload: 1, start,end,eventName,eventState});
        }

      });
    }
  },
};
