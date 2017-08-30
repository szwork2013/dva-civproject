import React from 'react';
import { connect } from 'dva';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './DoingBox.css';
import DoingCasesComponent from '../components/DoingBox/DoingCases';
import Header from '../components/Header/Header'
const onSearch=(val)=>{
  //alert(val); <SearchBar placeholder="搜索" onSubmit={onSearch} />
};
function DoingBox() {
  return (
    <div className={styles.normal}>
      {!_global.isHideNav?<Header goback title="工单办理"/>:''}
      <DoingCasesComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(DoingBox);
