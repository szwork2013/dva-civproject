import React,{Component} from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './EventItem.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast,PickerView} from 'antd-mobile';

 class EventItem extends Component{
  constructor(props,context){
    super(props,context);
     this.location = (e, rowData)=> {

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
    const {dispatch,rowData} = this.props;
    this.onItemClick = ()=> {
      dispatch(routerRedux.push({
        pathname: '/EventDetail',
        query: rowData
      }));
    };
  }
  render(){
    const {rowData} = this.props;
     let badgeTxt = '';
    if (!rowData.ReadCaseTime) {
      badgeTxt = '新';
    }
    if (rowData.OverTimeInfo || rowData.IsOverTime == '1') {
      badgeTxt = '超时';
    }
    return(
      <WingBlank size="sm">
        <WhiteSpace size="sm"/>

        <Card onClick={this.onItemClick}>
          <Badge text={badgeTxt} corner>
            <Card.Header
              title={rowData.EventCode}
            />
            <Card.Body>
              <div>{rowData.EventName}-{rowData.EventState}</div>
              <div>{rowData.Summary}</div>
            </Card.Body>
            <Card.Footer onClick={(e)=> this.location(e,rowData)} content={rowData.UpdateTime} extra={<div>定位</div>}/>
          </Badge>
        </Card>

        <WhiteSpace size="sm"/>
      </WingBlank>
    );
  }

}
export default connect()(EventItem);
