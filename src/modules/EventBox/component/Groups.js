import React from 'react';
import { Accordion } from 'antd-mobile';
import GroupItemsComponent from '../../../components/Common/GroupItems';


function Groups({FlowNodeMeta={},scan=true,form}) {
  return (
    <Accordion defaultActiveKey="0" className="my-accordion">
      {
       FlowNodeMeta.Groups.map(function (group, j) {

            if (group.Visible == 0) {
              return;
            }
            const Schema = group.Schema;
            if (Schema.length == 0) {
              return;
            }

            return (<Accordion.Panel header={group.GroupName}>
              <GroupItemsComponent Schema={Schema} Values={FlowNodeMeta.Values} scan={scan} form={form}/>
            </Accordion.Panel>);
          })
      }

    </Accordion>
  );
}

export default Groups;
