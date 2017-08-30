import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './AllCaseBox.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast} from 'antd-mobile';

function CaseItemComponent({dispatch,rowData}) {
  const location = (e, rowData)=> {

    try {
      const xy = rowData.XY || '';
      if (!xy) {
        Toast.offline('坐标不存在，无法定位', 2);
        return;
      }
      const xyArr = xy.split(',');
      const x = xyArr[0];
      const y = xyArr[1] || '';
      if (!x || !y) {
        Toast.offline('坐标格式不正确，无法定位', 2);
        return;
      }
      const title = rowData.EventName || '';
      _global.locationPoint(x, y, title);

    } catch (e) {
      Toast.offline(JSON.stringify(e), 2);
    } finally {
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
    }

  }
  const onItemClick = ()=> {
    dispatch(routerRedux.push({
      pathname: '/AllCaseDetail',
      state: rowData
    }));

    const caseItem = rowData;
    const {CaseNo,FlowName,ActiveName,EventCode}=caseItem
  };

  let badgeTxt = '';
  if (!rowData.ReadCaseTime) {
    badgeTxt = '新';
  }
  if (rowData.OverTimeInfo || rowData.IsOverTime == '1') {
    badgeTxt = '超时';
  }
  return (
    <WingBlank size="sm">
      <WhiteSpace size="sm"/>

      <Card onClick={onItemClick}>
        <Badge text={badgeTxt} corner>
          <Card.Header
            title={rowData.CaseNo}
          />
          <Card.Body>
            <div>{rowData.FlowName}-{rowData.ActiveName}</div>
            <div>{rowData.Summary}</div>
          </Card.Body>
          <Card.Footer onClick={(e)=> location(e,rowData)} content={rowData.UnderTakeTime} extra={<div>定位</div>}/>
        </Badge>
      </Card>

      <WhiteSpace size="sm"/>
    </WingBlank>
  );
}

export default connect()(CaseItemComponent);