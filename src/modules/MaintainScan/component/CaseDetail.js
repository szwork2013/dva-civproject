import React from 'react';
import GroupsComponent from './Groups';
function CaseDetail(TableMetaDatas) {
  return (
    <div>
      <GroupsComponent FlowNodeMetas={TableMetaDatas} scan={true}/>
    </div>
  );
}

export default CaseDetail;
