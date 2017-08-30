import React from 'react';
import { connect } from 'dva';
import styles from './MaintainScan.css';
import MaintainScanCasesComponent from './MaintainScanCases';
import Header from '../../../components/Header/Header'

function MaintainScan() {
  return (
    <div className={styles.normal}>
      {!_global.isHideNav?<Header goback title="养护总览"/>:''}
      <MaintainScanCasesComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MaintainScan);
