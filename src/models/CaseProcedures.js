import * as CaseProceduresService from '../services/CaseProcedures';
export default {
  namespace: 'CaseProcedures',
  state: {
    procedures: []
  },
  reducers: {
    save(state, {payload:{data:data}}){
      const proce = JSON.parse(data.DataList[0]);
      state.procedures = [].concat(proce);
      return {...state};
    }
  },
  effects: {
    *fetch({payload:{CaseNo}}, {call,put}){
      const data=yield call(CaseProceduresService.fetch, {CaseNo});
      yield put({type: 'save', payload: {data}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query }) => {
        if (pathname === '/DoingCaseDetail'||pathname === '/AllCaseDetail') {
          //const {editInfos,caseItem}=state;

          if (query) {
            const uid = query.uid || '';
            const eventCode = query.eventCode || '';
            const CaseNo = query.caseNo || '';
            if (uid && eventCode && CaseNo) {
              dispatch({type: 'fetch', payload: {CaseNo}});
              return;
            }
          }

          if(state.hasProLoad){
            return;
          }
          const {CaseNo,FlowName,NodeName,EventCode}=state;
          dispatch({type: 'fetch', payload: {CaseNo}});
          state.hasProLoad=true;
          history.setState(state);
        }

      });
    }
  },
};
