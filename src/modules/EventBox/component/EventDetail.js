import React,{Component} from 'react'
import CaseDetailComponent from './CaseDetail'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,icon,Flex,Modal,Toast ,WingBlank,Icon} from 'antd-mobile';
import styles from './EventDetail.css'
import Header from '../../../components/Header/Header';
import {caseItem2CaseInfo,validateFormFields} from '../../../utils/common';
import { createForm } from 'rc-form';
 class EventDetail extends Component{
  constructor(props,context){
    super(props,context);
    this.onInValidClick = this.onInValidClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onInDispatchClick = this.onInDispatchClick.bind(this)
    this.onRecoverClick = this.onRecoverClick.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)

  }

  onInValidClick(){
    const {rowData} =this.props;
    const eventMainTable = rowData.EventMainTable
    const eventState = '无效'
    const eventCode = rowData.EventCode

    Modal.prompt('无效原因', '无效原因', [
      { text: '取消' },
      { text: '提交', onPress: value => this.props.dispatch({type:'EventDetail/changeEventState',payload:eventMainTable,eventCode,eventState,value})} ,
    ], 'plain-text', '100')
  }
  onCloseClick(){
    const {rowData} =this.props;
    const eventMainTable = rowData.EventMainTable
    const eventState = '无效'
    const eventCode = rowData.EventCode
    Modal.alert('关闭', '确定关闭吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.props.dispatch({type:'EventDetail/checkEventCanClose',payload:eventMainTable,eventCode,eventState}) },
    ])
  }
  onInDispatchClick(){
    const {FlowConfigArr,rowData} = this.props;
    const RowData = JSON.stringify(rowData)
    const station = rowData.DealStation;
    let alertItemArr = [];
    for(var i in FlowConfigArr){
      var value = FlowConfigArr[i];
      const FlowName = value.FlowName;
      const NodeName = value.NodeName;
      const HandOverMode = value.HandOverMode;
      const alertItem = {text:FlowName,onPress:()=>this.props.dispatch(routerRedux.push({
        pathname: '/EventDispatchDetail',
        query: {FlowName,NodeName,station,RowData,HandOverMode},
      }))}
      alertItemArr.push(alertItem)
    }

    Modal.alert('请选择流程', <div></div>,alertItemArr)

  }
  onRecoverClick(){
    const {rowData} =this.props;
    const eventMainTable = rowData.EventMainTable
    const eventState = '待处理'
    const eventCode = rowData.EventCode
    Modal.alert('恢复', '确定恢复吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.props.dispatch({type:'EventDetail/changeEventState',payload:eventMainTable,eventCode,eventState}) },
    ])

  }
  onSaveClick(){
    const {scanTableMetaData,form,dispatch,rowData,FlowConfigArr} = this.props;
    const station = rowData.Station;

    validateFormFields(form, function () {
      alert(JSON.stringify(form.getFieldsValue()));
      const changeVals = form.getFieldsValue();

      scanTableMetaData.Values.length = 0;
      for (const key in changeVals) {
        const value = {FieldName: key, FieldValue: changeVals[key] || ''}
        scanTableMetaData.Values.push(value);
      }
      let caseInfo = {}
      caseInfo['FlowName'] = FlowConfigArr.FlowName
      caseInfo['NodeName'] = FlowConfigArr.NodeName
      caseInfo['FieldGroup'] = FlowConfigArr.FieldGroup
      caseInfo['EventMainTable'] = rowData.EventMainTable
      caseInfo['IsCreate'] = rowData.IsCreate
      caseInfo['EventName'] = rowData.EventName
      caseInfo['EventCode'] = rowData.EventCode
      caseInfo['BizCode'] = rowData.BizCode
      caseInfo['Station'] = rowData.DealStation
      caseInfo['Direction'] = '1'
      caseInfo['TableGroup'] = ''
      caseInfo['UserID'] = _global.userInfo.uid
      const data={'caseInfo':caseInfo,'flowNodeData':scanTableMetaData}
      dispatch({
        type: 'EventDetail/saveCaseData',
        payload: {data,station}
      });
    });

  }

   componentWillUnmount(){
     const {dispatch} = this.props;
     const statusCode = '';
     dispatch({type:'EventDetail/saveChangeState',payload:statusCode})

   }


  render(){

    const {scanTableMetaData,rowData,EditFileds,stateChangeSuccess,form} =this.props;
    if (!scanTableMetaData.Groups) {
      return (<Icon className='center' size='lg' type="loading"/>);
    }
    if (stateChangeSuccess === 'success'){
      Toast.success('事件状态修改成功!', 1);
    }else if(stateChangeSuccess === 'false'){
      Toast.success('事件状态修改失败!', 1);
    }

    /*标题头的逻辑判断*/
    let headerTop,Nav;
    if (!_global.isHideNav){
      headerTop ={top:'1rem',fixed:'absolute'};
      Nav = (<Header goback title="调度箱详情"/>);
    }else {
      headerTop ={top:'0rem',fixed:'absolute'};
    }
    /*尾部处理条逻辑判断*/
    let handleView ;
    if (rowData.EventState === '处理中'){
      if(EditFileds===''){
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onInValidClick}  type="primary" inline style={{ width:'100%'}}>无效</Button>
            <Button onClick={this.onCloseClick} type="primary" inline style={{ width:'100%'}}>关闭</Button>
            <Button onClick={this.onInDispatchClick} type="primary" inline style={{ width:'100%'}}>分派</Button>
          </div>
        )
      }else {
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onInValidClick} type="primary" inline style={{ width:'100%'}}>无效</Button>
            <Button onClick={this.onCloseClick} type="primary" inline style={{ width:'100%'}}>关闭</Button>
            <Button onClick={this.onInDispatchClick} type="primary" inline style={{ width:'100%'}}>分派</Button>
            <Button onClick={this.onSaveClick} type="primary" inline style={{ width:'100%'}}>保存</Button>
          </div>
        )
      }

    }else if(rowData.EventState === '已处理') {
      handleView=(
        <div className={styles.handleViewContainer}>
          <Button  type="primary" inline style={{ width:'100%'}}>已处理</Button>
        </div>
      )

    }else if(rowData.EventState === '无效') {
      if(EditFileds == ''){
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onRecoverClick} type="primary" inline style={{ width:'100%'}}>恢复</Button>

          </div>
        )
      }else {
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onRecoverClick} type="primary" inline style={{ width:'100%'}}>恢复</Button>
            <Button onClick={this.onSaveClick} type="primary" inline style={{ width:'100%'}}>保存</Button>
          </div>
        )
      }

    }else if(rowData.EventState === '待处理'||rowData.EventState === '待审核'){
      if(EditFileds == ''){
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onInValidClick} type="primary" inline style={{ width:'100%'}}>无效</Button>
            <Button onClick={this.onCloseClick} type="primary" inline style={{ width:'100%'}}>关闭</Button>
            <Button onClick={this.onInDispatchClick} type="primary" inline style={{ width:'100%'}}>分派</Button>
          </div>
        )
      }else {
        handleView=(
          <div className={styles.handleViewContainer}>
            <Button onClick={this.onInValidClick} type="primary" inline style={{ width:'100%'}}>无效</Button>
            <Button onClick={this.onCloseClick} type="primary" inline style={{ width:'100%'}}>关闭</Button>
            <Button onClick={this.onInDispatchClick} type="primary" inline style={{ width:'100%'}}>分派</Button>
            <Button onClick={this.onSaveClick} type="primary" inline style={{ width:'100%'}}>保存</Button>
          </div>
        )
      }
    }

    return(
      <div>
        {Nav}
        <div className={styles.header} style={headerTop}>
          <form>
            <CaseDetailComponent scanTableMetaData={scanTableMetaData} scan={false} form={form} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
          </form>
          <Flex className="footer">
            <WingBlank size="sm"/>
            {handleView}
            <WingBlank size="sm"/>
          </Flex>
        </div>

      </div>

    )
  }

}

function mapStateToProps(state) {
  const { scanTableMetaData,rowData,EditFileds,stateChangeSuccess,FlowConfigArr} = state.EventDetail||[];
  return {
    scanTableMetaData,rowData,EditFileds,stateChangeSuccess,FlowConfigArr
  };
}
const EventDetailForm = createForm()(EventDetail);
export default connect(mapStateToProps)(EventDetailForm);
/*export default connect(mapStateToProps)(EventDetail);*/
