import React,{Component} from 'react'
import { connect } from 'dva';
import PartrolCountItem from './PartrolCountItem'
import  styles from './PartrolCases.css'
import {ListView,Button,SearchBar,Icon} from 'antd-mobile';
import Header from '../../../components/Header/Header';
function PartrolCases({dispatch, DataList,station,dataFrom,dateTo}) {
  if(!DataList.length){
    return(<Icon className='center' size='lg' type="loading"/>);
  }
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  let dataSource=ds.cloneWithRows(DataList);
  const row = (rowData) => {
    return (<PartrolCountItem rowData={rowData} />);
  };
  const onEndReached=()=>{

  };



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
          {'加载完成'}
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
  const { DataList,station,dateFrom,dateTo} = state.PartrolCases||[];
  return {
    DataList,station,dateFrom,dateTo
  };
}

export default connect(mapStateToProps)(PartrolCases);
