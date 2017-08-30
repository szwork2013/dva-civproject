import React,{Component} from 'react'
import {connect} from 'dva'
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,Flex,Modal,Toast ,WingBlank} from 'antd-mobile';
import styles from './MaintainScanDetail.css'
import Header from '../../../components/Header/Header';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import TabBar from 'rc-tabs/lib/TabBar';
import MaintainScanDetailListComponent from './MaintainScanDetailList';

 class MaintainScanDetail extends Component{
  constructor(props,context){
    super(props,context);

    const TabPane = Tabs.TabPane;
    const {rowData} = this.props;
    const bizName = rowData.BizName;
    let TabNameArr = [];
    if(bizName === '场站设备检定'||bizName === '车用设备检定'){
      TabNameArr = ['设备详情','任务详情'];
    }else if(bizName === '调压器养护'||bizName === '阀门养护'){
      TabNameArr = ['台账信息','任务详情','耗材详情','物料详情','采购详情'];
    }else if(bizName === '场站设备'||bizName === '车用设备'){
      TabNameArr = ['设备详情','任务详情','耗材详情']
    }else if(bizName === '阴极保护桩检测'||bizName === '工商户安检'||bizName === '工商户表具'||bizName === '工商户表具检定'||bizName === '工商户抄表'||bizName === '工商户台账'){
      TabNameArr = ['台账信息','任务详情']
    }else if(bizName === '防腐层检测'){
      TabNameArr = ['测量点','破损点','任务信息']
    }
    this.makeTabPane = key => (
          <TabPane tab={TabNameArr[key]} key={key}>
            <MaintainScanDetailListComponent rowData={rowData} tabName={TabNameArr[key]}/>
          </TabPane>
        );

    this.makeMultiTabPane = (count) => {
      const result = [];
      for (let i = 0; i <= TabNameArr.length; i++) {
        result.push(this.makeTabPane(i));
      }
      return result;
    };
  }
  render(){
    const {rowData} = this.props;
    const bizName = rowData.BizName;
    let TabNameArr = [];
    if(bizName === '场站设备检定'||bizName === '车用设备检定'){
      TabNameArr = ['设备详情','任务详情'];
    }else if(bizName === '调压器养护'||bizName === '阀门养护'){
      TabNameArr = ['台账信息','任务详情','耗材详情','物料详情','采购详情'];
    }else if(bizName === '场站设备'||bizName === '车用设备'){
      TabNameArr = ['设备详情','任务详情','耗材详情']
    }else if(bizName === '阴极保护桩检测'||bizName === '工商户安检'||bizName === '工商户表具'||bizName === '工商户表具检定'||bizName === '工商户抄表'||bizName === '工商户台账'){
      TabNameArr = ['台账信息','任务详情']
    }else if(bizName === '防腐层检测'){
      TabNameArr = ['测量点','破损点','任务信息']
    }
    const tabBarRender=TabNameArr.length>2?(<SwipeableInkTabBar />):(<TabBar />);
    /*const tabBarRender=(<SwipeableInkTabBar pageSize={2} />);*/
    let headerTop;
    if (!_global.isHideNav){
      headerTop ={top:'1rem',fixed:'absolute'};

    }else {
      headerTop ={top:'0rem',fixed:'absolute'};
    }
    return(
      <div>
        {!_global.isHideNav?<Header goback title="养护详情"/>:''}
        <div className={styles.header} style={headerTop}>
          <Tabs defaultActiveKey='1'  renderTabBar={()=>tabBarRender }  swipeable={false}>
            {this.makeMultiTabPane(11)}
          </Tabs>
        </div>
      </div>

    )
  }

}

function mapStateToProps(state) {
  const {rowData } = state.MaintainScanDetail||[];
  return {
    rowData
  };
}
export default connect(mapStateToProps)(MaintainScanDetail);
