import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './DoingCaseDetail.css';
import {Tabs, WhiteSpace ,Button,icon,Flex,Modal,Toast ,WingBlank,Icon} from 'antd-mobile';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import TabBar from 'rc-tabs/lib/TabBar';
//import * as action from '../action';
//import { bindActionCreators } from 'redux';
import checksvg from '../svg/icon-core/check.svg';
const prompt = Modal.prompt;

import CaseProcedureComponent from '../components/Common/CaseProcedure';
import CaseDetailComponent from '../components/Common/CaseDetail';
import Header from '../components/Header/Header';
const TabPane = Tabs.TabPane;

const makeTabPaneDetail = (tab, title, index)=> (
  <TabPane tab={title} key={title}>
    <CaseDetailComponent scanTableMetaData={tab}
                         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
  </TabPane>
);
const makeTabPaneProcedure = ()=> (
  <TabPane tab='办理流程' key='办理流程'>
    <CaseProcedureComponent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
  </TabPane>
);

function DoingCaseDetail({dispatch, caseItem,scanTableMetaDatas, FlowNodeMeta_edit,FlowInfoConfig}) {

  if (!scanTableMetaDatas || scanTableMetaDatas.length == 0) {
    return (<Icon className='center' size='lg' type="loading"/>);
  }
  const panels = [];

  scanTableMetaDatas.map(function (tab, index) {
    panels.push(makeTabPaneDetail(tab, tab.TableAlias || tab.TableName, index.toString()));
  });

  if (panels.length > 0) {
    panels.push(makeTabPaneProcedure());
  }

  const table0 = scanTableMetaDatas[scanTableMetaDatas.length-1] || {};

  const defaultActiveKey = table0.TableAlias || table0.TableName || '办理流程';
  //const defaultActiveKey = (scanTableMetaDatas.length-1).toString();

  const NodeType = FlowInfoConfig.NodeType;
  const FieldGroup = FlowInfoConfig.FieldGroup;

  let handOverBtnName = FlowInfoConfig.NodeName;
  const isCanFinish = NodeType == 2 && !FieldGroup;
  if (isCanFinish) {
    handOverBtnName = '完成';
  }
  const isHandOver = !FieldGroup && NodeType != 2;
  if (isHandOver) {
    handOverBtnName = '移交';
  }

  const onBack = () => prompt('回退原因', '',
    [
      {text: '取消'},
      {
        text: '提交',
        onPress: value => new Promise((resolve) => {

          dispatch({
            type: 'CaseDetail/caseBack',
            payload: {caseItem, value, resolve}
          });

        }),
      },
    ]);
  const onHand = ()=> {
    if (isCanFinish) {
      //完成
      const flowNodeMeta = scanTableMetaDatas[scanTableMetaDatas.length - 1].FlowNodeMeta;
      dispatch({
        type: 'CaseDetail/caseFinish',
        payload: {caseItem, flowNodeMeta}
      });
      return;
    }
    if (isHandOver) {
      const flowNodeMeta = scanTableMetaDatas[scanTableMetaDatas.length - 1].FlowNodeMeta;
      dispatch(routerRedux.push({
        pathname: '/HandOver',
        state: {caseItem, flowNodeMeta}
      }));
      return;
    }

    // const {editInfos}=CaseDetail;
    //dispatch(routerRedux.goForward(1));
    //routerRedux.isActive()
    dispatch(routerRedux.push({
      pathname: '/DoingCaseHand',
      state: {FlowNodeMeta_edit, FlowInfoConfig, caseItem}
    }));
    //routerRedux.isActive()
  };

  //const handleTabClick = (key)=> {
  //  console.log('onTabClick', key);
  //}
  //const callback = (key)=> {
  //  console.log('onTabClick', key);
  //}
  //<Button onClick={onBack} type="ghost" inline
  //        style={{ marginRight: '0.08rem', width:'100%'}}>回退</Button>

  const AllowBack = FlowInfoConfig.AllowBack == 1 && NodeType != 1;
  let headerTop,Nav;
  if (!_global.isHideNav){
    headerTop ={top:'1rem',fixed:'absolute'};
    Nav = (<Header goback title="办理详情"/>);
  }else {
    headerTop ={top:'0rem',fixed:'absolute'};
  }

  const tabBarRender=panels.length>3?(<SwipeableInkTabBar />):(<TabBar />);
  return (
    <div>
      {Nav}
      <div className={styles.header} style={headerTop}>
        <Tabs swipeable={false} defaultActiveKey={defaultActiveKey} renderTabBar={()=>tabBarRender}>
          {panels}
        </Tabs>
      </div>

      <Flex className="footer">
        <WingBlank size="sm"/>
        {AllowBack ? <Button onClick={onBack} type="ghost" inline
                             style={{ marginRight: '0.08rem', width:'100%'}}>回退</Button> : ''}


        <Button onClick={onHand} type="primary" inline style={{ width:'100%'}}>{handOverBtnName}</Button>
        <WingBlank size="sm"/>
      </Flex>

    </div>
  );
}
let i = 0;
function mapStateToProps(state, ownProps) {
  // const caseItem = ownProps.location.state;

  const {caseItem, scanTableMetaDatas,FlowNodeMeta_edit,FlowInfoConfig} = state.CaseDetail;

  return {caseItem, scanTableMetaDatas, FlowNodeMeta_edit, FlowInfoConfig};
}

//function mapDispatchToProps(dispatch) {
//  // alert('dispatch');
//   return bindActionCreators(action, dispatch)
//
//}

export default connect(mapStateToProps)(DoingCaseDetail);
