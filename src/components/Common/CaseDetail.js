import React from 'react';
import { connect } from 'dva';
import styles from './CaseDetail.css';
import GroupsComponent from './Groups';
function CaseDetail({scanTableMetaData}) {
  //const FlowNodeMetas=[scanTableMetaData.FlowNodeMeta];
  //scanTableMetaDatas.map(function(tab,index){
  //  FlowNodeMetas.push(tab.FlowNodeMeta);
  //});
  //for(let i=0;i<scanTableMetaDatas.length;i++){
  //  FlowNodeMetas.push(scanTableMetaDatas[i].FlowNodeMeta);
  //}
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <GroupsComponent FlowNodeMetas={[scanTableMetaData.FlowNodeMeta]} scan={true}/>
    </div>
  );
}

//function mapStateToProps(state,ownPro) {
//  const {scanTableMetaDatas}=state.CaseDetail;
//  return {scanTableMetaDatas};
//}
//export default connect(mapStateToProps)(CaseDetail);
export default CaseDetail;

