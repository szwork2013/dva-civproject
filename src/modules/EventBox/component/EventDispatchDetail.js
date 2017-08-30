import React,{Component} from 'react'
import CaseDetailComponent from './CaseDetail'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {Tabs, WhiteSpace ,Button,Flex,Modal,Toast ,WingBlank,Icon} from 'antd-mobile';
import styles from './EventDispatchDetail.css'
import Header from '../../../components/Header/Header';
import {caseItem2CaseInfo,validateFormFields} from '../../../utils/common';
import { createForm } from 'rc-form';






 class EventDispatchDetail extends Component{
  constructor(props,context){
    super(props,context);
    this.onDispatchClick = this.onDispatchClick.bind(this)
  }
   onDispatchClick(){

     const {station,FlowName,NodeName,rowData,form,scanTableMetaData,dispatch,HandOverMode} =this.props;
     const ScanTableMetaData = JSON.stringify(scanTableMetaData)
     const RowData = JSON.stringify(rowData)
     let Station;
     validateFormFields(form, function () {
       alert(JSON.stringify(form.getFieldsValue()));
       const changeVals = form.getFieldsValue();

       scanTableMetaData.Values.length = 0;
       for (const key in changeVals) {
         const value = {FieldName: key, FieldValue: changeVals[key] || ''}
         scanTableMetaData.Values.push(value);
       }
       if (HandOverMode === '跨站移交'||HandOverMode === '移交选择人'){
         if(HandOverMode === '跨站移交'){
           Station = ''
         }else {
           Station = station
         }
         dispatch(routerRedux.push({
           pathname: '/SelectPeople',
           query: {Station,FlowName,NodeName,RowData,ScanTableMetaData}
         }));
       }else if(HandOverMode === '自处理'){
         let caseInfo = {}
         caseInfo['FlowName'] = FlowName
         caseInfo['NodeName'] = NodeName
         caseInfo['FieldGroup'] = RowData.FieldGroup
         caseInfo['EventMainTable'] = RowData.EventMainTable
         caseInfo['IsCreate'] = RowData.IsCreate
         caseInfo['EventName'] = RowData.EventName
         caseInfo['EventCode'] = RowData.EventCode
         caseInfo['Station'] = RowData.DealStation
         caseInfo['Direction'] = '1'
         caseInfo['TableGroup'] = ''
         caseInfo['UserID'] = _global.userInfo.uid
         caseInfo['Undertakeman'] = _global.userInfo.uid
         caseInfo['Opinion'] = ''
         const data={'caseInfo':caseInfo,'flowNodeData':ScanTableMetaData}
         dispatch({
           type:'SelectPeople/fetchDispatch',
           payload:data
         })
       }else if(HandOverMode === '默认人'){
         let caseInfo = {}
         caseInfo['FlowName'] = FlowName
         caseInfo['NodeName'] = NodeName
         caseInfo['FieldGroup'] = RowData.FieldGroup
         caseInfo['EventMainTable'] = RowData.EventMainTable
         caseInfo['IsCreate'] = RowData.IsCreate
         caseInfo['EventName'] = RowData.EventName
         caseInfo['EventCode'] = RowData.EventCode
         caseInfo['Station'] = RowData.DealStation
         caseInfo['Direction'] = '1'
         caseInfo['TableGroup'] = ''
         caseInfo['UserID'] = _global.userInfo.uid
         caseInfo['Undertakeman'] = ''
         caseInfo['Opinion'] = ''
         const data={'caseInfo':caseInfo,'flowNodeData':ScanTableMetaData}
         dispatch({
           type:'SelectPeople/fetchDispatch',
           payload:data
         })
       }
     });
   }
  render(){

    const {scanTableMetaData,form,disPatchSuccess} =this.props;
    if (!scanTableMetaData.Groups) {
      return (<Icon className='center' size='lg' type="loading"/>);
    }
    if (disPatchSuccess === true){
      Toast.success('分派成功', 1);
    }else if(disPatchSuccess === false){
      Toast.fail('分派失败', 1);
    }
    let headerTop,Nav;
    if (!_global.isHideNav){
      headerTop ={top:'1rem',fixed:'absolute'};
      Nav = (<Header goback title="调度箱详情"/>);
    }else {
      headerTop ={top:'0rem',fixed:'absolute'};
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
            <div className={styles.handleViewContainer}>
              <Button onClick={this.onDispatchClick}  type="primary" inline style={{ width:'100%'}}>分派</Button>
            </div>
            <WingBlank size="sm"/>
          </Flex>
        </div>

      </div>)
  }

}
function mapStateToProps(state) {
  const { scanTableMetaData,station,FlowName,NodeName,rowData,HandOverMode,disPatchSuccess} = state.EventDispatchDetail||[];
  return {
    scanTableMetaData,station,FlowName,NodeName,rowData,HandOverMode,disPatchSuccess
  };
}
const EventDispatchDetailForm = createForm()(EventDispatchDetail);
export default connect(mapStateToProps)(EventDispatchDetailForm);
//export default connect(mapStateToProps)(EventDispatchDetail);
