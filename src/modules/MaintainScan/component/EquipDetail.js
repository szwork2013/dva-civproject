import React from 'react';
import GroupsComponent from './EquipGroups';
function EquipDetail(TableMetaDatas) {
  return (
    <div>
      <GroupsComponent FlowNodeMetas={TableMetaDatas} scan={true}/>
    </div>
  );
}

export default EquipDetail;
