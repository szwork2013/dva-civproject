import React from 'react';
import {Accordion } from 'antd-mobile';
import GroupItemsComponent from './GroupItems';

function Groups({FlowNodeMetas=[],scan=true,form}) {
  if(!scan&&!form){
    return (<div>请参考在办箱编辑页面修正代码</div>)
  }
  return (
      <Accordion defaultActiveKey="0" className="my-accordion">
        {
          FlowNodeMetas.map(function (FlowNodeMeta, i) {

            const Groups = FlowNodeMeta.Groups || [];
            const Values = FlowNodeMeta.Values || [];

            return Groups.map(function (group, j) {

              if (group.Visible == 0) {
                return;
              }
              const Schema = group.Schema;
              if (Schema.length == 0) {
                return;
              }

              return (
                <Accordion.Panel header={<span style = {{fontWeight: 'bold'}} > {group.GroupName} </span>}>
                  <GroupItemsComponent Schema={Schema} Values={Values} scan={scan} form={form}/>
                </Accordion.Panel>
              );
            })
          })
        }
      </Accordion>
  );
}


export default Groups;
