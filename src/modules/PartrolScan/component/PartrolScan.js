import React from 'react';
import { connect } from 'dva';
import styles from './PartrolScan.css';
import PartrolCasesComponent from './PartrolScanCases';
import Header from '../../../components/Header/Header'

function PartrolScan() {
  return (
    <div className={styles.normal}>
      {!_global.isHideNav?<Header goback title="巡检总览"/>:''}
      <PartrolCasesComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PartrolScan);
