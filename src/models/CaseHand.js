import * as CaseHandService from '../services/CaseHand';
import { routerRedux } from 'dva/router';
import {caseItem2CaseInfo} from '../utils/common';
import {Toast} from 'antd-mobile';
export default {
  namespace: 'CaseHand',
  state: {
    FlowInfoConfig: {},
    flowNodeMeta: {},
    caseItem: {},
    // hasLoad:false
  },
  reducers: {
    save(state, {payload:{flowNodeMeta,FlowInfoConfig,caseItem}}){

      //alert(JSON.stringify(flowNodeMeta));
      //alert(1);
      //取缓存
      //const valueCacheArr = _global.getLocalStorage(`${caseItem.CaseNo}-${caseItem.ActiveName}`);
      //if (valueCacheArr &&_global.isArray(valueCacheArr)&&valueCacheArr.length> 0) {
      //  const Values = flowNodeMeta.Values || [];
      //  Values.map(function (value, index) {
      //    const valItem = valueCacheArr.find((val, index) => val.FieldName == value.FieldName)
      //    if (valItem) {
      //      value.FieldValue = valItem.FieldValue;
      //    }
      //  });
      //}
      // const hasLoad=true;
      return {...state, flowNodeMeta, FlowInfoConfig, caseItem};
    },
    editVal(state, {payload:{fieldName,val,type}}){

      if (!type) {
        type = 'edit';
      }
      const {flowNodeMeta} = state;
      const Values = flowNodeMeta.Values;
      let valItem = Values.find((itemVal, index) => itemVal.FieldName == fieldName) || {
          FieldName: fieldName,
          FieldValue: ''
        };

      switch (type) {
        case 'edit':
        {
          valItem.FieldValue = val;
        }
          break;
        case 'append':
        {
          const valArr = valItem.FieldValue.split(',');
          const index = valArr.findIndex((itemVal, i)=> {
            return itemVal == val;
          });
          if (index >= 0) {
            break;
          }
          valItem.FieldValue = `${valItem.FieldValue},${val}`;
          valItem.FieldValue = valItem.FieldValue.replace(/(^\,*)|(\,*$)/g, "");
        }
          break;
        case 'remove':
        {
          const _valArr = valItem.FieldValue.split(',');
          const _index = _valArr.findIndex((_itemVal, i)=> {
            return _itemVal == val;
          });
          if (_index < 0) {
            break;
          }
          _valArr.splice(_index, 1);
          valItem.FieldValue = _valArr.join(',');
        }
          break;
        default:
        {
          valItem.FieldValue = val;
        }
      }

      //缓存界面值
      _global.setLocalStorage(`${state.caseItem.CaseNo}-${state.caseItem.ActiveName}`, flowNodeMeta.Values);
      return {...state, flowNodeMeta};
    },


    updateConfigs(state, {payload:{fieldName,configs}}){
      const {flowNodeMeta} = state;
      const groups = flowNodeMeta.Groups;
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const schemas = group.Schema;
        let schema = schemas.find((itemVal, index) => itemVal.FieldName == fieldName);
        if (!schema) {
          continue;
        }
        schema.ConfigInfo = configs;
        break;
      }
      return {...state, flowNodeMeta};
    },


  },
  effects: {
    *initData({payload:{flowNodeMeta,FlowInfoConfig,caseItem}}, {call,put}){
      //const groups = flowNodeMeta.Groups;
      //for (let i = 0; i < groups.length; i++) {
      //  const group = groups[i];
      //  const schemas = group.Schema;
      //  for (let j = 0; j < schemas.length; j++) {
      //    const schema = schemas[j];
      //
      //    switch (schema.Shape) {
      //      case '选择器':
      //      {
      //        if (!schema.ConfigInfo) {
      //          break;
      //        }
      //
      //        const data = yield call(CaseHandService.getDataDictionaryList, schema.ConfigInfo);
      //        const childList = data[0].childList || [];
      //
      //        const configs = childList.map((child)=> {
      //          return child.NODENAME
      //        });
      //        schema.ConfigInfo = configs.join(',');
      //
      //      }
      //        break;
      //      case '站点选择器':
      //      {
      //        if (schema.ConfigInfo) {
      //          break;
      //        }
      //        const data = yield call(CaseHandService.getStationListByUserID);
      //
      //        const configs = data.getMe || [];
      //        schema.ConfigInfo = configs.join(',');
      //      }
      //        break;
      //      case '人员选择器':
      //      {
      //        if (!schema.ConfigInfo) {
      //          break;
      //        }
      //
      //        //角色的特殊性，不用递归
      //        const node = yield call(CaseHandService.getMenTreeByRole, schema.ConfigInfo);
      //        const childNodes=node.ChildNodes;
      //        const configs = childNodes.map((child)=> {
      //          return child.Value
      //        });
      //        schema.ConfigInfo = configs.join(',');
      //      }
      //        break;
      //    }
      //  }
      //}



      yield put({type: 'save', payload: {flowNodeMeta, FlowInfoConfig, caseItem}});
    },
    *saveCase({payload:{caseItem,flowNodeMeta}}, {call,put}){

      Toast.loading('保存中...', 60);
      const caseInfo = caseItem2CaseInfo(caseItem);
      //先上传图片和文件
      //1.上传图片
      const values = flowNodeMeta.Values || [];
      let isSucceed = true;
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const fieldValue = value.FieldValue;

        if (fieldValue.indexOf('base64') >= 0) {

          const code = caseInfo.CaseNo;

          const base64Arr = fieldValue.split(',');


          let base64List = [];

          for (let j = 0; j < base64Arr.length; j++) {
            const item = base64Arr[j];
            if (item.indexOf('base64') < 0) {
              continue;
            }
            let imgType = item.split(';')[0].split('/')[1] || 'png';
            if (imgType == 'jpeg' || imgType == 'JPEG') {
              imgType = 'jpg';
            }
            const base64Str = item.split('，')[1];//中文逗号
            const base64o = {code, imgType, base64Str}

            base64List.push(base64o);
          }

          const data = yield call(CaseHandService.saveImgs, base64List);

          if (data.ResultCode <= 0) {
            isSucceed = false;
            break;
          }

          const serverUrl = data.DataList.join(',');
          value.FieldValue = serverUrl;
        }
      }

      //2.上传录音和文件

      if (!isSucceed) {
        return;
      }

      const data = yield call(CaseHandService.save, {caseInfo, flowNodeMeta});
      Toast.hide()

      if (data.errMsg === '') {
        Toast.success('保存成功!', 1);
        //删除缓存
        _global.delLocalStorage(`${caseItem.CaseNo}-${caseItem.ActiveName}`);
      }
    },

    *handOverSelf({payload:{caseItem,flowNodeMeta,Undertakeman, Opinion,Direction}}, {call,put}){
      Toast.loading('保存中...', 60);

      const caseInfo = caseItem2CaseInfo(caseItem);
      if (Undertakeman) {
        caseInfo.Undertakeman = Undertakeman;
      }
      if (Opinion) {
        caseInfo.Opinion = Opinion;
      }
      if (Direction) {
        caseInfo.Direction = Direction;
      }

      let flowInfoPostParam = {caseInfo, flowNodeMeta}

      const data = yield call(CaseHandService.handOverSelf, {flowInfoPostParam});
      Toast.hide()
      if (data.errMsg === '') {
        Toast.success('保存成功!', 1);
         yield put(routerRedux.go(-2));
      }
    },
    //*GetStationListByUserID({payload:{fieldName}}, {call,put}){
    //  // (state, {payload:{fieldName}}, {call,put}){
    //  // let configs = _global.getLocalStorage('StationList');
    //  //  if (!configs) {
    //  const data = yield call(CaseHandService.GetStationListByUserID);
    //  const configs = data.getMe;
    //  if (!configs) {
    //    return;
    //  }
    //  _global.setLocalStorage('StationList2', configs);
    //
    //  const configStr = configs.join(',');
    //  //alert(fieldName);
    //  yield put({type: 'updateConfigs', payload: {fieldName, configStr}});
    //  // const Values = flowNodeMeta.Values;
    //  //let valItem = Values.find((itemVal, index) => itemVal.FieldName == fieldName) || {
    //  //    FieldName: fieldName,
    //  //    FieldValue: ''
    //  //  };
    //}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,state }) => {
        if (pathname === '/DoingCaseHand') {
          const {FlowNodeMeta_edit:flowNodeMeta,FlowInfoConfig,caseItem}=state;
          dispatch({type: 'initData', payload: {flowNodeMeta, FlowInfoConfig, caseItem}});
          //alert('setup');
        }

      });
    }
  },
};
