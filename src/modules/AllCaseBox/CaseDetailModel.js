import {request, post} from '../../utils/request';
import {caseItem2CaseInfo} from '../../utils/common';
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

function getDetail(FlowName, CaseNo, NodeName, EventCode) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/CaseOverviewGetFlowTableInfo
  ?flowName=${FlowName}&caseNo=${CaseNo}&nodeName=${NodeName}&eventCode=${EventCode}`;

  return request(url);
}

function getUserBeanByuid(uid) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_MobileBusiness/REST/ThreePartREST.svc/threepart/GetUserInfoByUid?uid=${uid}`;

  return request(url);
}

function getCurCaseItem(eventCode, caseNo) {
  const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/EventManage/GetCurCaseDetailInfo?eventCode=${eventCode}&caseNo=${caseNo}`;

  return request(url);
}

function setHasRead(caseInfo) {
  // const url =
  // `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST
  // / CaseManageREST.svc/ReadCase`; return post(url,caseInfo);
}

export default {
  namespace : 'AllCaseDetailModel',
  state : {
    caseItem: {},
    FlowInfoConfig: {},
    scanTableMetaDatas: [],
    FlowNodeMeta_edit: {}
  },
  reducers : {
    save(state, {
      payload: {
        data: data
      }
    }) {
      const FlowTableInfos = data.getMe;

      // let {FlowInfoConfig,scanTableMetaDatas,FlowNodeMeta_edit}=state;
      let FlowInfoConfig = {}
      let scanTableMetaDatas = [];
      //构造需要的 FlowNodeMeta
      const FlowNodeMeta_edit = {};
      FlowNodeMeta_edit.Groups = [];
      FlowNodeMeta_edit.Modules = [];
      FlowNodeMeta_edit.Values = [];

      //详情界面
      FlowTableInfos.map(function (FlowTableInfo, i) {

        const TableMetaDatas = FlowTableInfo.TableMetaDatas || [];
        scanTableMetaDatas = scanTableMetaDatas.concat(TableMetaDatas);
      });

      //处理界面
      FlowTableInfos.map(function (FlowTableInfo, i) {

        const FlowInfoConfigs = FlowTableInfo.FlowInfoConfig || [];
        FlowInfoConfigs.map(function (FlowTableInfo, j) {
          const ViewState = FlowTableInfo.ViewState;
          if ('edit' === ViewState) {

            //存储流程信息
            FlowInfoConfig = FlowTableInfo;

            //
            const FieldGroup = FlowTableInfo.FieldGroup;
            const TableName = FlowTableInfo.TableName;

            for (let k = 0; k < scanTableMetaDatas.length; k++) {
              const TableMetaDatas = scanTableMetaDatas[k] || [];

              const _TableName = TableMetaDatas.TableName;
              if (TableName != _TableName) {
                continue;
              }

              const FlowNodeMeta = TableMetaDatas.FlowNodeMeta;
              const Groups = FlowNodeMeta.Groups;
              const Values = FlowNodeMeta.Values;

              const FieldGroupArr = FieldGroup.split(',') || [];
              for (let p = 0; p < FieldGroupArr.length; p++) {
                const _FieleName = FieldGroupArr[p];
                if (!_FieleName) {
                  continue;
                }

                //存储values
                const editValues = Values.find((val, index) => val.FieldName == _FieleName) || {
                  FieldName: _FieleName,
                  FieldValue: ''
                };
                FlowNodeMeta_edit
                  .Values
                  .push(editValues);

                //存储Groups
                for (let q = 0; q < Groups.length; q++) {
                  const group = Groups[q];

                  //统一在绘制界面时判断Visible if(group.Visible==0){  continue; }

                  const Schema = group.Schema;

                  const editSchema = Schema.find((val, index) => val.FieldName == _FieleName);

                  if (!editSchema) {
                    continue;
                  }
                  //找到了所在的组
                  let editGroup = FlowNodeMeta_edit
                    .Groups
                    .find((val, index) => val.GroupName == group.GroupName);

                  if (editGroup) {
                    editGroup
                      .Schema
                      .push(editSchema);
                    continue;
                  }

                  editGroup = {};
                  editGroup.GroupName = group.GroupName;
                  editGroup.Schema = [];
                  editGroup.Visible = group.Visible;

                  editGroup
                    .Schema
                    .push(editSchema);

                  FlowNodeMeta_edit
                    .Groups
                    .push(editGroup);
                }
              }
            }
          }
        });
      });

      return {
        ...state,
        FlowInfoConfig,
        scanTableMetaDatas,
        FlowNodeMeta_edit
      };
    },
    saveCaseItem(state, {payload: {
        caseItem
      }}) {
      const FlowInfoConfig = {};
      const scanTableMetaDatas = [];
      const FlowNodeMeta_edit = {}

      return {FlowInfoConfig, scanTableMetaDatas, FlowNodeMeta_edit, caseItem};
    }
  },
  effects : {
    *fetch({
      payload: {
        FlowName,
        CaseNo,
        ActiveName,
        EventCode
      }
    }, {call, put}) {
      const data = yield call(getDetail, FlowName, CaseNo, ActiveName, EventCode);
      yield put({type: 'save', payload: {
          data
        }});
    },
    *setHasRead({
      payload: {
        caseItem
      }
    }, {call, put}) {
      const caseInfo = caseItem2CaseInfo(caseItem);
      const data = yield call(setHasRead, caseInfo);
    },
    *directDetail({
      payload: {
        uid,
        eventCode,
        caseNo
      }
    }, {call, put}) {
      const data = yield call(getUserBeanByuid, uid);
      const userInfo = data.DataList[0];
      _global.userInfo = userInfo;
      _global.userInfo.uid = _global.userInfo.UserID;

      const caseItemRet = yield call(getCurCaseItem, eventCode, caseNo);
      const caseItem = caseItemRet.getMe[0];

      yield put({type: 'saveCaseItem', payload: {
          caseItem
        }});

      const {CaseNo, FlowName, ActiveName, EventCode} = caseItem;

      yield put({
        type: 'fetch',
        payload: {
          FlowName,
          CaseNo,
          ActiveName,
          EventCode
        }
      });
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname, state, query}) => {
        if (pathname === '/AllCaseDetail') {
          if (query) {
            const uid = query.uid || '';
            const eventCode = query.eventCode || '';
            const caseNo = query.caseNo || '';

            if (uid && eventCode && caseNo) {
              dispatch({
                type: 'directDetail',
                payload: {
                  uid,
                  eventCode,
                  caseNo
                }
              });
              return;
            }
          }

          if (!state) {
            Toast.fail('浏览器版本不支持', 2);
            dispatch(routerRedux.goBack());

            return;
          }

          if (state.hasDetailLoad) {
            return;
          }

          const caseItem = state;
          dispatch({type: 'saveCaseItem', payload: {
              caseItem
            }});

          const {CaseNo, FlowName, ActiveName, EventCode} = caseItem

          dispatch({
            type: 'fetch',
            payload: {
              FlowName,
              CaseNo,
              ActiveName,
              EventCode
            }
          });
          dispatch({type: 'setHasRead', payload: {
              caseItem
            }});

          state.hasDetailLoad = true;

          history.setState(state);
        }
      });
    }
  }
};
