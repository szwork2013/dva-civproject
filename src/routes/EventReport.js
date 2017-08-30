import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Icon, Button,Flex,WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import GroupsComponent from '../components/Common/Groups';
import Header from '../components/Header/Header'

class EventReport extends React.Component{
  render(){
    const {dispatch,flowNodeMeta,caseItem,FlowInfoConfig}=this.props;
    const form = this.props.form;

    if (!flowNodeMeta) {
      return (<Icon className='center' size='lg' type="loading"/>);
    }

    return (
      <div>
        <form className="content">
          <GroupsComponent FlowNodeMetas={[flowNodeMeta]} scan={false} form={form}/>
        </form>
        <Button className="footer" type="ghost" inline
                style={{ marginRight: '0.08rem', width:'100%'}}>上报</Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {

  const {flowNodeMeta}=state.EventReport;

  return {flowNodeMeta};
}
const EventReportForm = createForm()(EventReport);
export default connect(mapStateToProps)(EventReportForm);
