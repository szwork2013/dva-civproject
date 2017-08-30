import React,{Component} from 'react'

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,Flex,Modal,Toast ,WingBlank} from 'antd-mobile';
import styles from './MaintainScanCases.css'
import Header from '../../../components/Header/Header';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import TabBar from 'rc-tabs/lib/TabBar';
import MaintainScanList from './MaintainScanList'

function MaintainScanCases({DataList}) {
  const TabPane = Tabs.TabPane;
  if (!DataList.length){

    return(<div></div>)
  }

  function callback(key) {
    console.log('onChange', key);
  }
  const handleTabClick = key => {
    console.log('onTabClick', key);
  }
  const makeTabPane = key => (
    <TabPane tab={DataList[key]} key={key}>
     {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
        {DataList[key]}
      </div>*/}
      <MaintainScanList BIZNAME={DataList[key]} />

    </TabPane>
  );


  const makeMultiTabPane = (count) => {
    const result = [];
    for (let i = 0; i <= DataList.length; i++) {
      result.push(makeTabPane(i));
    }
    return result;
  };

  const tabBarRender=(<SwipeableInkTabBar pageSize={3} />);
  let headerTop;
  if (!_global.isHideNav){
    headerTop ={top:'1rem',fixed:'absolute'};

  }else {
    headerTop ={top:'0rem',fixed:'absolute'};
  }

  return(
    <div className={styles.header} style={headerTop}>
      <Tabs defaultActiveKey='1'  renderTabBar={()=>tabBarRender }  onTabClick={()=>handleTabClick} swipeable={false}>
        {makeMultiTabPane(11)}
      </Tabs>
    </div>
  );

}



function mapStateToProps(state) {
  const { DataList} = state.MaintainScanCases||[];
  return {
    DataList
  };
}
export default connect(mapStateToProps)(MaintainScanCases);
