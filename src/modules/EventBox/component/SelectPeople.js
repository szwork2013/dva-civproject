import React,{Component} from 'react'
import Tree from '../../../reactui/src/Tree/index'
import RadioGroup from '../../../reactui/src/RadioGroup'
import Icon from '../../../reactui/src/Icon'
import CheckBox from '../../../reactui/src/Checkbox'
import {connect} from 'dva'
import  styles from './SelectPeople.css'
import {Button} from 'antd-mobile'
import Header from '../../../components/Header/Header';
import {dispatch} from "../../../reactui/src/utils/lazyload";
import {Toast} from 'antd-mobile'

 class SelectPeople extends Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      readOnly: false,
      selectAble: true,
      capture: 3,
      sep: ',',
      value: '1.2.2',
      showValue: '1.2.2',
      showAccountsIcon: true,
      treeData: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.OnCancel = this.OnCancel.bind(this)
    this.onDispatch = this.onDispatch.bind(this)

  }
  handleChange (value) {
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    }
    this.setState({ showValue: value })
  }
  OnCancel(){

 }
  onDispatch(){
    const UnderTakeMan = this.state.showValue
    const {FlowName,NodeName,station,rowData,scanTableMetaData,dispatch} = this.props
    const RowData = JSON.parse(rowData)
    const ScanTableMetaData = JSON.parse(scanTableMetaData)
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
    caseInfo['Undertakeman'] = UnderTakeMan
    const data={'caseInfo':caseInfo,'flowNodeData':ScanTableMetaData}
    dispatch({
      type:'SelectPeople/fetchDispatch',
      payload:data
    })

}
   componentWillUnmount(){
    const disPatchSuccess = ''
     const {dispatch} = this.props
     dispatch({
       type:'SelectPeople/initDispatch',
       payload:disPatchSuccess
     })
   }
  render(){
    let headerTop,Nav;
    if (!_global.isHideNav){
      headerTop ={top:'1rem',fixed:'absolute'};
      Nav = (<Header goback title="调度箱详情"/>);
    }else {
      headerTop ={top:'0rem',fixed:'absolute'};
    }
    const {selectTree,disPatchSuccess} = this.props;
    if (disPatchSuccess === true){
      Toast.success('分派成功', 1);
    }else if(disPatchSuccess === false){
      Toast.fail('分派失败', 1);
    }
    return(
      <div>
        {Nav}
        <div className={styles.header}>
          <div >
            <Tree data={[selectTree]}
                  readOnly={this.state.readOnly}
                  capture={parseInt(this.state.capture)}
                  icons={
                    this.state.showAccountsIcon
                      ? [
                        <Icon key="fold" icon="accounts-add" />,
                        <Icon key="expand" icon="accounts" />,
                        <Icon key="leaf" icon="account" />
                      ]
                      : undefined
                  }
                  onClick={(data) => console.log(data)}
                  onChange={this.state.selectAble ? this.handleChange : undefined}
                  textTpl={(data) => {
                    return (
                      <label className="tree-example">
                        {data.Text}
                      </label>

                    )
                  }}
                  valueTpl="{id}"
                  value={this.state.value}
                  open
                  sep={this.state.sep}
            />
          </div>
          <div className={styles.ensure_dispatch}>
            <Button onClick={this.OnCancel} type="primary" inline style={{ width:'100%'}}>取消</Button>
            <Button onClick={this.onDispatch} type="primary" inline style={{ width:'100%'}}>分派</Button>
          </div>
        </div>
      </div>

    )
  }

}

function mapStateToProps(state) {
  const { selectTree,FlowName,NodeName,station,rowData,scanTableMetaData,disPatchSuccess} = state.SelectPeople||[];
  return {
    selectTree,FlowName,NodeName,station,rowData,scanTableMetaData,disPatchSuccess
  };
}

export default connect(mapStateToProps)(SelectPeople);
