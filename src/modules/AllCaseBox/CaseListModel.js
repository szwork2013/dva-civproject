import {request} from '../../utils/request';
import {post} from '../../utils/request';

const pageSize = 10;

function fetch(page, flowName, nodeName, keyword) {
  const uid = _global.userInfo.uid;

  if (!uid) {
    throw new Error('用户已掉线');
    return;
  }

  if (!page) {
    throw new Error('当前页码错误');
    return;
  }

  flowName = flowName || '';
  nodeName = nodeName || '';
  keyword = keyword || '';

  let url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/CaseManage/GetCaseOverviewBoxWithPaging?_mid=1834&pageIndex=${page}&pageSize=${pageSize}&sortFields=ID0&direction=desc&businessType=&operType=&station=&eventState=&eventInfo=${keyword}&dateFrom=&dateTo=&eventType=&sysType=%E4%B8%9A%E5%8A%A1%E7%B3%BB%E7%BB%9F&flowName=`;

  return request(url);
}

export default {
  namespace: 'AllCaseListModel',
  state: {
    curPage: 1,
    dataList: [],
    isLoading: false,
    totalRcdNum: 0,
    isFinish: false,
    flowName: '',
    nodeName: '',
    keyword: '',
    dataMenuList: []
  },
  reducers: {
    save(state, {payload: {data: data, isRefresh}}) {
      //var dataList=data.getMe;
      const isLoading = false;
      let curPage = state.curPage;
      let dataList = [];
      if (isRefresh) {
        dataList = data.getMe;
        curPage = 1;
      } else {
        dataList = [...state.dataList, ...data.getMe];
        curPage++;
      }
      const totalRcdNum = data.totalRcdNum;
      //state.curPage++;
      //state.dataList = state.dataList.concat(data.getMe);
      return {...state, isLoading, dataList, totalRcdNum, curPage};
    },
    setIsLoading(state, {payload: {}}) {
      const isLoading = true;
      return {...state, isLoading};
    },
    setFinish(state, {payload: {}}) {
      const isFinish = true;
      return {...state, isFinish};
    },
    initData(state, {payload: flowName, nodeName}) {
      return {...state, flowName, nodeName};
    }
  },
  effects: {
    * fetch({payload: page, flowName, nodeName, keyword}, {call, put}) {

      yield put({type: 'setIsLoading', payload: {}});

      const data = yield call(fetch, page, flowName, nodeName, keyword);
      const isRefresh = page == 1;
      yield put({type: 'save', payload: {data, isRefresh}});
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, state, query}) => {
        if (pathname === '/AllCaseList') {
          // const params={page:1};
          let flowName = '', nodeName = '';

          if (query) {
            flowName = query.flowName || '';
            nodeName = query.nodeName || '';
            dispatch({type: 'initData', payload: flowName, nodeName});
          }

          dispatch({type: 'fetch', payload: 1, flowName, nodeName});
        }
      });
    }
  },
};
