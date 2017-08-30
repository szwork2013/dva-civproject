import { routerRedux } from 'dva/router';
export default {
  namespace: 'AppIndex',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state,query}) => {
        if (pathname === '/AppIndex') {
          // let path = _global.href.split('#')[1];
          // const pathparams = path.split('?');
          // path = pathparams[0];
          // if (path == '/') {
          //   //dispatch({type: 'initData', payload: flowName, nodeName});
          //   return;
          // }
          // let params = pathparams[1] || '';
          // const query = {};
          // if (params) {
          //   params = params.split('&');

          //   for (let i = 0; i < params.length; i++) {
          //     const p = params[i].split('=');
          //     const key = p[0];
          //     if (key == '_k') {
          //       continue;
          //     }
          //     query[p[0]] = p[1];
          //   }
          // }
          // dispatch(routerRedux.push({
          //   pathname: path,
          //   query: query
          // }));
        }
      });
    }
  },
};
