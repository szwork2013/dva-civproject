import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './AllCaseBox.css';
import {Tabs, WhiteSpace ,Button,icon,Flex,Modal,Toast ,WingBlank,Icon} from 'antd-mobile';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import TabBar from 'rc-tabs/lib/TabBar';
//import * as action from '../action';
//import { bindActionCreators } from 'redux';
import checksvg from '../../svg/icon-core/check.svg';
const prompt = Modal.prompt;

import CaseProcedureComponent from '../../components/Common/CaseProcedure';
import CaseDetailComponent from '../../components/Common/CaseDetail';
import Header from '../../components/Header/Header';

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

function CaseDetailRoute({dispatch, caseItem,scanTableMetaDatas, FlowNodeMeta_edit,FlowInfoConfig}) {
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

  const NodeType = FlowInfoConfig.NodeType;
  const FieldGroup = FlowInfoConfig.FieldGroup;

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
    </div>
  );
}

let i = 0;

function mapStateToProps(state, ownProps) {
  const {caseItem, scanTableMetaDatas,FlowNodeMeta_edit,FlowInfoConfig} = state.AllCaseDetailModel;

  return {caseItem, scanTableMetaDatas, FlowNodeMeta_edit, FlowInfoConfig};
}

export default connect(mapStateToProps)(CaseDetailRoute);
