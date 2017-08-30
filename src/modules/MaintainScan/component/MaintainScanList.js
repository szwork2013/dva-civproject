import React,{Component} from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,Flex,Modal,Toast ,WingBlank,Icon,ListView} from 'antd-mobile';
import styles from './MaintainScanList.css'
import MaintainScanListItem from './MaintainScanListItem'

class MaintainScanList extends Component{
  constructor(props,context){
    super(props,context);
    const { dispatch,pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType,dataList,totalRcdNum,isLoading,curman} = this.props;
    this.onEndReached = ()=>{
     /* if(totalRcdNum<=dataList.length){
        dispatch({
          type: 'MaintainScanList/setFinish',
          payload:{}
        });
        return;
      }
      if (isLoading) {
        return;
      }
      dispatch({
        type: 'MaintainScanList/fetch1',
        payload:pageIndex+1,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType
      });*/
    }
    this.loadMore = ()=>{
       if(totalRcdNum<=dataList.length){
        dispatch({
          type: 'MaintainScanList/setFinish',
          payload:{}
        });
        return;
      }
      if (isLoading) {
        return;
      }
      dispatch({
        type: 'MaintainScanList/fetch1',
        payload:pageIndex+1,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType
      });
    }

    this.row = (rowData)=>{
      return (<MaintainScanListItem rowData={rowData} dispatch={dispatch} />);
    }
  }

  componentDidMount(){
    const { dispatch,BIZNAME} = this.props;
    let pageIndex =1,direction = '',dateFrom='',dateTo= '',checkState = '',stationName = '',equipmentType = '',cureMan = '',area = ''
    if(BIZNAME === '调压器养护'||BIZNAME ==='阀门养护'||BIZNAME ==='防腐层检测'||BIZNAME ==='阴极保护桩检测'||BIZNAME ==='工商户安检'||BIZNAME ==='工商户表具'||BIZNAME ==='工商户表具检定'||BIZNAME ==='工商户抄表'||BIZNAME ==='工商户台账'){

      dispatch({
        type: 'MaintainScanList/fetch2',
        payload:pageIndex,BIZNAME,dateFrom,dateTo,checkState,cureMan,area
      })
    }else if(BIZNAME === '场站设备检定'||BIZNAME ==='车用设备检定'||BIZNAME ==='车用设备'||BIZNAME ==='场站设备'){
      dispatch({
        type: 'MaintainScanList/fetch1',
        payload:pageIndex,direction,BIZNAME,dateFrom,dateTo,checkState,stationName,equipmentType
      })
    }


}
  render(){

    const { pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType,dataList,totalRcdNum,isLoading,listDictionary,BIZNAME} = this.props;

    if(!listDictionary[BIZNAME]){
      return(<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
        {'12121212'}
      </div>);
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource=ds.cloneWithRows(listDictionary[BIZNAME]);


    return (
      <div>
        <ListView
          className="am-list"
          dataSource={dataSource}
          renderRow={this.row}
          useBodyScroll
          renderFooter={() => <div style={{ padding: 20, textAlign: 'center' }} onClick={this.loadMore}>
            {'加载完成'}
          </div>}
          onEndReached={this.onEndReached}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onEndReachedThreshold={10}
        />
      </div>
    );

  }

}
function mapStateToProps(state) {
  const { pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType,dataList,totalRcdNum,isLoading,listDictionary} = state.MaintainScanList||[];
  return {
    pageIndex,direction,bizName,dateFrom,dateTo,checkState,stationName,equipmentType,dataList,totalRcdNum,isLoading,listDictionary
  };
}
export default connect(mapStateToProps)(MaintainScanList);
