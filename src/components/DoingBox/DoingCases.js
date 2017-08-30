import React from 'react';
import { connect } from 'dva';
import styles from './DoingCases.css';
import {ListView,Button,SearchBar} from 'antd-mobile';
import DoingCaseItem from './DoingCaseItem';




function DoingCases({dispatch,dataList,isLoading,totalRcdNum,isFinish,flowName,nodeName,curPage}) {

  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  let dataSource=ds.cloneWithRows(dataList);
  const row = (rowData) => {
    return (<DoingCaseItem rowData={rowData} />);
  };
  const onEndReached=()=>{

    if(totalRcdNum<=dataList.length){
      dispatch({
        type: 'DoingCases/setFinish',
        payload:{}
      });
      return;
    }
    if (isLoading) {
      return;
    }
    dispatch({
      type: 'DoingCases/fetch',
      payload:curPage+1,flowName,nodeName
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
      <SearchBar
        placeholder="搜索"
        onSubmit={keyword=>dispatch({
          type:'DoingCases/fetch',
          payload:curPage=1,flowName,nodeName,keyword
        })}
        onCancel={()=>dispatch({
          type:'DoingCases/fetch',
          payload:curPage=1,flowName,nodeName
        })}
      />
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
  const { dataList,isLoading,totalRcdNum ,isFinish,flowName,nodeName,curPage,keyword} = state.DoingCases||[];
  return {
    dataList,
    isLoading,
    totalRcdNum,
    isFinish,
    flowName,
    nodeName,
    curPage,
    keyword
  };
}

export default connect(mapStateToProps)(DoingCases);
