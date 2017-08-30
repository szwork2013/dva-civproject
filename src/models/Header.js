import * as HeaderService from '../services/Header'
export default {
  namespace: 'Header',
  state: {
    DataMenuList:[],
  },
  reducers: {
    saveMenu(state,{payload:{data:data}}){
      let DataMenuList =[];
      DataMenuList = data.DataList[0].MainMenus;
      return{...state,DataMenuList};
    }
  },
  effects: {
    *fetchMenu({payload:{}},{call,put}){
      const data = yield call(HeaderService.fetch);
      yield put({type:'saveMenu',payload:{data}});

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
        if (pathname === '/DoingBox'||pathname === '/EventBox') {
          dispatch({type: 'fetchMenu', payload: {}});
        }
      });
    }
  },
};
