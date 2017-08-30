import React,{Component} from 'react'
import { connect } from 'dva';
import EventItem from './EventItem'
import  styles from './EventCases.css'
import {ListView,Button,SearchBar} from 'antd-mobile';
import Header from '../../../components/Header/Header';
function EventCases({dispatch,curPage, dataList, isLoading, totalRcdNum, isFinish, start, end, eventName, eventState}) {
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  let dataSource=ds.cloneWithRows(dataList);
  const row = (rowData) => {
    return (<EventItem rowData={rowData} />);
  };
  const onEndReached=()=>{

    if(totalRcdNum<=dataList.length){
      dispatch({
        type: 'EventCases/setFinish',
        payload:{}
      });
      return;
    }
    if (isLoading) {
      return;
    }
    dispatch({
      type: 'EventCases/fetch',
      payload:curPage+1,start,end,eventName,eventState
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
  const { curPage, dataList, isLoading, totalRcdNum, isFinish, start, end, eventName, eventState} = state.EventCases||[];
  return {
    curPage, dataList, isLoading, totalRcdNum, isFinish, start, end, eventName, eventState
  };
}

export default connect(mapStateToProps)(EventCases);
