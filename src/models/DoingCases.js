import * as DoingCasesService from '../services/DoingCases';
import * as HeaderService from '../services/Header'
export default {
  namespace: 'DoingCases',
  state: {
    curPage:1,
    dataList: [],
    isLoading: false,
    totalRcdNum: 0,
    isFinish: false,
    flowName: '',
    nodeName: '',
    keyword:'',
    dataMenuList:[]
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
    *fetch({payload:page,flowName,nodeName,keyword}, {call,put}){

      yield put({type: 'setIsLoading', payload: {}});

      const data = yield call(DoingCasesService.fetch, page, flowName, nodeName,keyword);
      const isRefresh = page == 1;
      yield put({type: 'save', payload: {data, isRefresh}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
       // encodeURI()
        if (pathname === '/DoingBox'||pathname === '/标准工单'||pathname==encodeURI('/标准工单')) {
          // const params={page:1};
          let flowName = '', nodeName = '';
          if (query) {
            flowName = query.flowName||'';
            nodeName = query.nodeName||'';
            dispatch({type: 'initData', payload: flowName, nodeName});
          }
          //alert(JSON.stringify(query));

          dispatch({type: 'fetch', payload: 1, flowName, nodeName});

        }

        //if (pathname === '/DoingBox'||pathname === '/标准工单'||pathname==encodeURI('/标准工单')||pathname === '/') {
        //  alert(1);
        //  // const params={page:1};
        //  let flowName = '', nodeName = '';
        //  if (query) {
        //    flowName = query.flowName||'';
        //    nodeName = query.nodeName||'';
        //    dispatch({type: 'initData', payload: flowName, nodeName});
        //  }
        //  //alert(JSON.stringify(query));
        //
        //  dispatch({type: 'fetch', payload: 1, flowName, nodeName});
        //
        //}
      });
    }
  },
};
