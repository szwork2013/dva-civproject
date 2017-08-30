import React from 'react';
import {connect} from 'dva';
import styles from './AllCaseBox.css';
import {ListView, Button, SearchBar} from 'antd-mobile';
import CaseItemComponent from './CaseItemComponent';
import Header from '../../components/Header/Header'

function CaseListComponent({
  dispatch,
  dataList,
  isLoading,
  totalRcdNum,
  isFinish,
  flowName,
  nodeName,
  curPage
}) {
  var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  let dataSource = ds.cloneWithRows(dataList);
  const row = (rowData) => {
    return (<CaseItemComponent rowData={rowData}/>);
  };
  const onEndReached = () => {

    if (totalRcdNum <= dataList.length) {
      dispatch({type: 'AllCaseListModel/setFinish', payload: {}});
      return;
    }
    if (isLoading) {
      return;
    }
    dispatch({
      type: 'AllCaseListModel/fetch',
      payload: curPage + 1,
      flowName,
      nodeName
    });

  };

  let tip = isLoading
    ? '加载中...'
    : '加载完毕';

  if (isFinish) {
    tip = '没有更多';
  }

  let headerTop;
  if (!_global.isHideNav) {
    headerTop = (styles.doing_component);
  }
  return (
    <div className={styles.normal}>
      {!_global.isHideNav
        ? <Header goback title="工单总览"/>
        : ''}
      <div className={headerTop}>
        <SearchBar
          placeholder="搜索"
          onSubmit={keyword => dispatch({
          type: 'AllCaseListModel/fetch',
          payload: curPage = 1,
          flowName,
          nodeName,
          keyword
        })}
          onCancel={() => dispatch({
          type: 'AllCaseListModel/fetch',
          payload: curPage = 1,
          flowName,
          nodeName
        })}/>
        <ListView
          className="am-list"
          dataSource={dataSource}
          renderRow={row}
          useBodyScroll
          renderFooter={() => <div style={{
          padding: 30,
          textAlign: 'center'
        }}>
          {tip}
        </div>}
          onEndReached={onEndReached}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onEndReachedThreshold={10}/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.AllCaseListModel || {};
}

export default connect(mapStateToProps)(CaseListComponent);
