import * as LoginService from '../services/Login';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'Login',
  state: {
    DataMenuList: [],
    userName: 'admin',
    passWord: 'admin',
  },
  reducers: {

  },
  effects: {
    *login({ payload: userName, password, serverHost }, { call, put }) {
      if (!userName) {
        Toast.fail('用户名不能为空', 2);
        return;
      }

      if (!password) {
        Toast.fail('密码不能为空', 2);
        return;
      }

      if (serverHost && serverHost != '.') {
        _global.ipPort = serverHost;
      }

      //用户信息获取
      let data = yield call(LoginService.fetch, userName, password) || {};

      if (data.ResultCode && data.ResultCode <= 0) {
        alert(data.ResultMessage);

        return;
      }

      let userInfo = data.DataList[0];

      _global.setLocalStorage('userInfo', userInfo);

      _global.userInfo = userInfo;
      _global.userInfo.uid = userInfo.UserID;

      //菜单等配置获取
      //const  configData= yield call(LoginService.getConfigData,token);

      //登录成功，进入主页
      yield put(routerRedux.push({
        pathname: '/AppIndex'
      }));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, state, query }) => {
        if (pathname == '/Login' || pathname == '/') {
          if (_global.userName) {
            let userName = _global.userName;
            let password = '3.1415926';
            let serverHost = 'http://192.168.12.193';

            if (_global.ipPort != 'http://localhost:8000')
              serverHost = _global.ipPort;

            dispatch({ type: 'login', payload: userName, password, serverHost });
          }
        }
      });
    }
  },
};
