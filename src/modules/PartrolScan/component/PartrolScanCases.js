import React,{Component} from 'react'
import { connect } from 'dva';
import PartrolScanItem from './PartrolScanItem'
import  styles from './PartrolScanCases.css'
import {ListView,Button,SearchBar} from 'antd-mobile';
import Header from '../../../components/Header/Header';
function PartrolScanCases({dispatch,PageIndex, dataList, isLoading, totalRcdNum, isFinish,dateFrom,dateTo,station,creator,partroler,checkState}) {
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  let dataSource=ds.cloneWithRows(dataList);
  const row = (rowData) => {
    return (<PartrolScanItem rowData={rowData} />);
  };
  const onEndReached=()=>{

    if(totalRcdNum<=dataList.length){
      dispatch({
        type: 'PartrolScan/setFinish',
        payload:{}
      });
      return;
    }
    if (isLoading) {
      return;
    }
    dispatch({
      type: 'PartrolScan/fetch',
      payload:PageIndex+1,dateFrom,dateTo,station,creator,partroler,checkState
    });

  };

  let tip=isLoading ? '加载中...' : '加载完毕';

  if(isFinish){
    tip='没有更多';
  }

  let headerTop;
  if (!_global.isHideNav){
    headerTop =(styles.doing_component);
  }
  return (
    <div className={headerTop}>
      <ListView
        className="am-list"
        dataSource={dataSource}
        renderRow={row}
        useBodyScroll
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {tip}
        </div>}
        onEndReached={onEndReached}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onEndReachedThreshold={10}
      />
    </div>
  );

}
function mapStateToProps(state) {
  const { PageIndex, dataList, isLoading, totalRcdNum, isFinish,dateFrom,dateTo,station,creator,partroler,checkState} = state.PartrolScan||[];
  return {
    PageIndex, dataList, isLoading, totalRcdNum, isFinish, dateFrom,dateTo,station,creator,partroler,checkState
  };
}

export default connect(mapStateToProps)(PartrolScanCases);
