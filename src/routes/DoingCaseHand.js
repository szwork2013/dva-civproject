import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button,Flex,Icon,Toast,WingBlank } from 'antd-mobile';
import {caseItem2CaseInfo,validateFormFields} from '../utils/common';
//import { TreeSelect } from 'antd';
import styles from './DoingCaseHand.css';
import GroupsComponent from '../components/Common/Groups';
import Header from '../components/Header/Header'


class DoingCaseHand extends React.Component {
  render() {

    const {dispatch,flowNodeMeta,caseItem,FlowInfoConfig}=this.props;
    const form = this.props.form;

    if (!flowNodeMeta) {
      return (<Icon className='center' size='lg' type="loading"/>);
    }

    const handOverMode = FlowInfoConfig.HandOverMode;
    const NodeType = FlowInfoConfig.NodeType;
    let handOverBtnName = '移交';
    if (handOverMode == '自处理') {
      handOverBtnName = FlowInfoConfig.NodeName;
    }
    if (NodeType == 2) {
      handOverBtnName = '完成';
    }

    const onSave = ()=> {

      validateFormFields(form, function () {
        alert(JSON.stringify(form.getFieldsValue()));
        const changeVals = form.getFieldsValue();

        flowNodeMeta.Values.length = 0;
        for (const key in changeVals) {
          const value = {FieldName: key, FieldValue: changeVals[key] || ''}
          flowNodeMeta.Values.push(value);
        }
        dispatch({
          type: 'CaseHand/saveCase',
          payload: {caseItem, flowNodeMeta}
        });
      });

    };
    const onHandOver = ()=> {
      validateFormFields(form, function () {
        alert(JSON.stringify(form.getFieldsValue()));
        const changeVals = form.getFieldsValue();

        flowNodeMeta.Values.length = 0;
        for (const key in changeVals) {
          const value = {FieldName: key, FieldValue: changeVals[key] || ''}
          flowNodeMeta.Values.push(value);
        }
        if (NodeType == 2) {

          dispatch({
            type: 'CaseHand/handOverSelf',
            payload: {caseItem, flowNodeMeta}
          });
          return;
        }

        switch (handOverMode) {
          case "移交选择人":
          case "跨站移交":
          case "自处理或移交选择人":
          case "处理站点移交":
          case "本人站点移交":
          {
            // const flowNodeMeta=FlowNodeMeta_edit;
            dispatch(routerRedux.push({
              pathname: '/HandOver',
              state: {caseItem, flowNodeMeta}
            }));
          }
            break;
          case "自处理":
          {
            // 自处理：首节点分派或者上报的时候 caseInfo 中的 Undertakeman传自己的ID即可，
            // 不需要下一个节点的ID（服务已处理）,但是中间节点还是需要传入下一个节点ID(保持原样).
            let Undertakeman = _global.userInfo.uid;
            if (NodeType == 0) {
              Undertakeman = `${caseItem.NextNodeID}/${_global.userInfo.uid}`;
            }
            const Opinion = "";
            const Direction = 1;
            dispatch({
              type: 'CaseHand/handOverSelf',
              payload: {caseItem, flowNodeMeta, Undertakeman, Opinion, Direction}
            });
          }
            break;
          case "移交默认人":
          {
            dispatch({
              type: 'CaseHand/handOverSelf',
              payload: {caseItem, flowNodeMeta}
            });
          }
            break;
          default:
          {
            dispatch(routerRedux.push({
              pathname: '/HandOver',
              state: {caseItem, flowNodeMeta}
            }));
          }
            break;
        }
      });

    };
    let headerTop, Nav;
    if (!_global.isHideNav) {
      headerTop = {top: '1rem', fixed: 'absolute'};
      Nav = (<Header goback title="事件处理"/>);
    } else {
      headerTop = {top: '0rem', fixed: 'absolute'};
    }

    return (
      <div>
        {Nav}
        <form className={styles.content} style={headerTop}>
          <GroupsComponent FlowNodeMetas={[flowNodeMeta]} scan={false} form={form}/>
        </form>
        <Flex className="footer">
          <WingBlank size="sm"/>
          <Button onClick={onSave} type="ghost" inline
                  style={{ marginRight: '0.08rem', width:'100%'}}>保存</Button>

          <Button onClick={onHandOver} type="primary" inline style={{ width:'100%'}}>{handOverBtnName}</Button>
          <WingBlank size="sm"/>
        </Flex>
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  const {flowNodeMeta,caseItem,FlowInfoConfig}=state.CaseHand;
  //alert(JSON.stringify(flowNodeMeta));
  return {flowNodeMeta, caseItem, FlowInfoConfig};
}

const DoingCaseHandForm = createForm()(DoingCaseHand);
export default connect(mapStateToProps)(DoingCaseHandForm);
