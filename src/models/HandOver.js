import * as HandOverService from '../services/HandOver';
import { routerRedux } from 'dva/router';
import {caseItem2CaseInfo} from '../utils/common';
export default {
  namespace: 'HandOver',
  state: {
    caseItem:{},
    flowNodeMeta:{},
    handoverTree: {},
    undertakeMan:[],//初始态
    opinion:''////初始态
  },
  reducers: {
    save(state, {payload:{caseItem, flowNodeMeta}}){

      const keyopinion=`${caseItem.CaseNo}-${caseItem.ActiveName}-opinion`;
      const opinion=_global.getLocalStorage(keyopinion)||'';

      const keyundertakeMan=`${caseItem.CaseNo}-${caseItem.ActiveName}-undertakeMan`;
      const undertakeMan=_global.getLocalStorage(keyundertakeMan)||[];
      return {...state, caseItem, flowNodeMeta,opinion,undertakeMan};
    },
    saveHandoverTree(state, {payload:{handoverTree}}){
      return {...state, handoverTree};
    },
    editOpinion(state,{payload:{opinion}}){
      const {caseItem}=state;
      const key=`${caseItem.CaseNo}-${caseItem.ActiveName}-opinion`;
      _global.setLocalStorage(key,opinion);
      return {...state, opinion};

    },
    editUndertakeMan(state,{payload:undertakeMan}){
      const {caseItem}=state;
      const key=`${caseItem.CaseNo}-${caseItem.ActiveName}-undertakeMan`;
      _global.setLocalStorage(key,undertakeMan);
      return {...state, undertakeMan};

    },

    //checkOnchange(state, {payload:{val, checked}}){
    //  // state.flowNodeMeta=flowNodeMeta;
    //  let checkedManArr = state.checkedManArr;
    //  const index = checkedManArr.find(val);
    //  if (checked) {
    //    if (index >= 0) {
    //      return;
    //    }
    //    checkedManArr.push(val);
    //  } else {
    //    if (index < 0) {
    //      return;
    //    }
    //    checkedManArr.pop(val);
    //  }
    //
    //  return {...state, checkedManArr};
    //}
  },
  effects: {
    *getHandOverTree({payload:{caseItem}}, {call,put}){
      const caseInfo = caseItem2CaseInfo(caseItem);
      const data=yield call(HandOverService.getHandOverTree, caseInfo);
      //  alert(JSON.stringify(data));
      const handoverTree = data.getMe[0];
      yield put({type: 'saveHandoverTree', payload: {handoverTree}});

    },

    *handOver({payload:{caseItem, Undertakeman, opinion,flowNodeMeta}}, {call,put}){
      const caseInfo = caseItem2CaseInfo(caseItem);
      caseInfo.Undertakeman=Undertakeman;
      caseInfo.Opinion=opinion;
      caseInfo.Direction = 1

      const data=yield call(HandOverService.handOver, {caseInfo, flowNodeMeta});

      if (!data.errMsg) {
        //yield put(routerRedux.go(-3));

        const keyOpinion=`${caseItem.CaseNo}-${caseItem.ActiveName}-opinion`;
        _global.delLocalStorage(keyOpinion);

        const keyUndertakeMan=`${caseItem.CaseNo}-${caseItem.ActiveName}-undertakeMan`;
        _global.delLocalStorage(keyUndertakeMan);

        //yield put(routerRedux.replace({
        //  pathname: '/DoingBox'
        //}));
        yield put(routerRedux.go(-3));
      }
      //yield put({type: 'save', payload: {caseInfo,handoverTree}});
    }
    //*mergeHandOverMan({payload:{val, checked}}, {call,put}){
    //  yield put({type: 'save', payload: {caseInfo,handoverTree}});
    //}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state }) => {
        if (pathname === '/HandOver') {
          const {caseItem, flowNodeMeta}=state;
          dispatch({type: 'save', payload: {caseItem, flowNodeMeta}});

          dispatch({type: 'getHandOverTree', payload: {caseItem}});
        }

      });
    }
  },
};
