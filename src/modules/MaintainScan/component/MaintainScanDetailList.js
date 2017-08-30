import React,{Component} from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,Flex,Modal,Toast ,WingBlank,Icon,ListView} from 'antd-mobile';
import styles from './MaintainScanList.css'
import Header from '../../../components/Header/Header';
import CaseDetailComponent from './CaseDetail'
import EquipDetailComponent from './EquipDetail'
import MaintainMaterialListItem from './MaintainMaterialListItem'

class MaintainScanDetailList extends Component{
  constructor(props,context){
    super(props,context);
    this.row = (rowData) => {
      return (<MaintainMaterialListItem rowData={rowData} />);
    };
    this.onEndReached=()=>{

    };

  }
  componentDidMount(){
    const {rowData,dispatch,tabName} = this.props;

    if (tabName === '任务详情'){
      dispatch({
        type: 'MaintainScanDetail/fetchFeedback',
        payload:rowData,tabName
      })
    }else if(tabName === '台账信息'){
      dispatch({
        type: 'MaintainScanDetail/fetchTaskTable',
        payload:rowData,tabName
      })
    }else if(tabName === '设备详情'){
      dispatch({
        type: 'MaintainScanDetail/fetchStationTask',
        payload:rowData,tabName
      })
    }else if(tabName === '物料详情'){
      dispatch({
        type: 'MaintainScanDetail/fetchWuliao',
        payload:rowData,tabName
      })
    }else if(tabName === '采购详情'){
      dispatch({
        type: 'MaintainScanDetail/fetchCaiGou',
        payload:rowData,tabName
      })
    } else if(tabName === '耗材详情'){
      dispatch({
        type: 'MaintainScanDetail/fetchMaterial',
        payload:rowData,tabName
      })
    }



  }
  render(){

    const {TableMetaDatas,TabDataDictionary,tabName} =this.props;
    /*if (TableMetaDatas.length<1) {
      return (<Icon className='center' size='lg' type="loading"/>);
    }*/

    if (tabName === '任务详情'){
      if (TabDataDictionary[tabName]){
        const TableMetaData = TabDataDictionary[tabName].getMe[0].TableMetaDatas;
        return(
          <div>
            <CaseDetailComponent TableMetaDatas={TableMetaData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
          </div>
        )
      }else {
        return(<div>任务详情</div>)
      }

    }
    if (tabName === '设备详情'){
      if (TabDataDictionary[tabName]){
        const TableMetaData = TabDataDictionary[tabName].getMe
        return(
          <div>
            <EquipDetailComponent TableMetaDatas={TableMetaData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
          </div>
        )
      }else {
        return(<div>设备详情</div>)
      }
    }
    if (tabName === '耗材详情'){
      if (TabDataDictionary[tabName]){
        const TableMetaData = TabDataDictionary[tabName].DataList
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource=ds.cloneWithRows(TableMetaData);
        return(
          <div>
            <ListView
              className="am-list"
              dataSource={dataSource}
              renderRow={this.row}
              useBodyScroll
              renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                {'加载完成'}
              </div>}
              onEndReached={this.onEndReached}
              scrollRenderAheadDistance={500}
              scrollEventThrottle={20}
              onEndReachedThreshold={10}
            />
          </div>
        )
      }else {
        return(<div>耗材详情</div>)
      }
    }

  }

}
function mapStateToProps(state) {
  const { TableMetaDatas,TabDataDictionary} = state.MaintainScanDetail||[];
  return {
    TableMetaDatas,TabDataDictionary
  };
}
export default connect(mapStateToProps)(MaintainScanDetailList);
