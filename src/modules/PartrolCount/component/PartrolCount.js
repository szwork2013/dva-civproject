import React from 'react';
import { connect } from 'dva';
import styles from './PartrolCount.css';
import PartrolCasesComponent from './PartrolCases';
import Header from '../../../components/Header/Header'

function PartrolCount() {
  return (
    <div className={styles.normal}>
      {!_global.isHideNav?<Header goback title="巡检统计"/>:''}
      <PartrolCasesComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PartrolCount);
