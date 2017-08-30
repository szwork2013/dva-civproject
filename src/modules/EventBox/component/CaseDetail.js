import React from 'react';
import GroupsComponent from './Groups';
function CaseDetail({scanTableMetaData,scan,form}) {
  return (
    <div>
      <GroupsComponent FlowNodeMeta={scanTableMetaData} scan={scan} form={form}/>
    </div>
  );
}

export default CaseDetail;
