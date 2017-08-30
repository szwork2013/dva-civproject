import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Accordion, List,Checkbox ,TextareaItem,Toast,Icon } from 'antd-mobile';
import styles from './HandOver.css';
const CheckboxItem = Checkbox.CheckboxItem;

import { WhiteSpace ,Button,Flex,WingBlank} from 'antd-mobile';

let checkedManArr = [];

function HandOver({dispatch, caseItem,flowNodeMeta,handoverTree,opinion,undertakeMan}) {


  if (!handoverTree) {
    return (<Icon className='center' size='lg' type="loading"/>);
  }

  let ChildNodes = handoverTree.ChildNodes;
  if (!ChildNodes) {
    return (<div></div>);
  }
  checkedManArr=[];
  checkedManArr = checkedManArr.concat(undertakeMan);

  //承办人缓存
  const onChange = (val, self) => {
    //只在本页面缓存，不存进state
    const checked = self.target.checked;
   // checkOnchange(val, checked);

    const index = checkedManArr.findIndex((item, index) => item == val);

    if (checked) {
      if (index >= 0) {
        return;
      }
      checkedManArr.push(val);
    } else {
      if (index < 0) {
        return;
      }
      checkedManArr.splice(index, 1);
    }

    dispatch({
      type: 'HandOver/editUndertakeMan',
      payload: checkedManArr
    });

  }

  //承办意见缓存
  const onOpinionChange = (opinion)=> {

    dispatch({
      type: 'HandOver/editOpinion',
      payload: {opinion}
    });

  }

  const backPrePage = ()=> {
    dispatch(routerRedux.goBack());
  }
  const onHandOver = ()=> {

    if (checkedManArr.length == 0) {
      Toast.fail('请选择承办人', 2);
      return;
    }

    const Undertakeman = checkedManArr.join(',');

    dispatch({
      type: 'HandOver/handOver',
      payload: {caseItem, Undertakeman, opinion, flowNodeMeta}
    });

  }

  //界面绘制
  const HandOverRender = ({item})=> {

    if (!item.Text) {
      return (<div></div>);
    }

    let ChildNodes = item.ChildNodes;
    if (ChildNodes.length == 0) {
      let checked = item.Checked;
      let val = item.Value;

      if(undertakeMan&&undertakeMan.length>0){
        //以缓存为主
        const hasCheckedIndex = undertakeMan.findIndex((value, index) => value == val);
        checked=hasCheckedIndex > -1;
      }

      return (
        <CheckboxItem key={val} defaultChecked={checked
} onChange={e => {onChange(val,e)}}>
          { item.Text}
        </CheckboxItem>
      );
    }

    return (
      <Accordion defaultActiveKey="0" className="my-accordion">
        <Accordion.Panel header={item.Text}>
          <List className="my-list">
            {ChildNodes.map(function (item, j) {
              return (<List.Item key={item.Value}>{HandOverRender({item})}</List.Item>)
            })}
          </List>
        </Accordion.Panel>
      </Accordion>
    );
  }


  return (
    <div>
      <div className={styles.header}>
        <Accordion defaultActiveKey="0" key="-1" className="my-accordion">
          {
            ChildNodes.map(function (node, i) {
              return (
                <Accordion.Panel header={node.Text} key={i}>
                  <List className="my-list">
                    {node.ChildNodes.map(function (item, j) {
                      return ( <List.Item key={item.Value}>{HandOverRender({item})}</List.Item>)
                    })}

                  </List>
                </Accordion.Panel>
              )
            })
          }
        </Accordion>
      </div>
      <div className={styles.opitionContent}>
        <TextareaItem
          editable={true}
          placeholder='请输入办理意见'
          value={opinion}
          onChange={v=>onOpinionChange(v)}
          rows="3"
          count='200'
        />
      </div>
      <Flex className="footer">
        <WingBlank size="sm"/>
        <Button onClick={backPrePage} type="ghost" inline
                style={{ marginRight: '0.08rem', width:'100%'}}>取消</Button>
        <Button onClick={onHandOver} type="primary" inline style={{ width:'100%'}}>确定</Button>
        <WingBlank size="sm"/>
      </Flex>
    </div>

  );
}


function mapStateToProps(state, ownProps) {

  const {caseItem,flowNodeMeta,handoverTree,opinion,undertakeMan}=state.HandOver;
  return {caseItem, flowNodeMeta, handoverTree, opinion, undertakeMan};

}

export default connect(mapStateToProps)(HandOver);
