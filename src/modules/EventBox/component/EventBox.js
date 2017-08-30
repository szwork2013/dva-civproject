import React from 'react';
import { connect } from 'dva';
import styles from './EventBox.css';
import EventCasesComponent from './EventCases';
import Header from '../../../components/Header/Header'

function EventBox() {
  return (
    <div className={styles.normal}>
      {!_global.isHideNav?<Header goback title="调度箱"/>:''}
      <EventCasesComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(EventBox);
