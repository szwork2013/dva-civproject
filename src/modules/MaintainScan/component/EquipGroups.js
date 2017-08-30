import React from 'react';
import { Accordion } from 'antd-mobile';
import GroupItemsComponent from '../../../components/Common/GroupItems';


function EquipGroups({FlowNodeMetas={},scan=true}) {
  return (
    <Accordion defaultActiveKey="0" className="my-accordion">
      {
        FlowNodeMetas.TableMetaDatas.map(function (item, i) {

          const Groups = item.Groups||[];
          const Values = item.Values||[];

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
                <GroupItemsComponent Schema={Schema} Values={Values} scan={scan}/>
              </Accordion.Panel>
            );
          })
        })
      }

    </Accordion>
  );
}

export default EquipGroups;
