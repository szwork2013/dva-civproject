import React,{Component} from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './PartrolCountItem.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast,PickerView} from 'antd-mobile';

class PartrolCountItem extends Component{
  constructor(props,context){
    super(props,context);

  }
  render(){
    const {rowData} = this.props;

    return(
      <WingBlank size="sm">
        <WhiteSpace size="sm"/>

        <Card>
          <Badge  corner>
            <Card.Header
              title={rowData.userName} extra={<div>{'站点名称:'+rowData.stationName}</div>}
            />
            <Card.Body>
              <div className={styles.card_body}>
                <div>上报事件数:{rowData.reportIncidentNum}</div>
                <div>到位点数:{rowData.arriveNum}</div>
              </div>
              <div className={styles.card_body}>
                <div>反馈点数:{rowData.feedbackNum}</div>
                <div>覆盖管线长度:{rowData.coverLineLength}</div>
              </div>
              <div className={styles.card_body}>
                <div>累计在线时长:{rowData.onLineTimeSum}</div>
                <div>累计在线里程:{rowData.onLineRoadSum}</div>
              </div>
              {/*<div>上报事件数:{rowData.reportIncidentNum}-到位点数:{rowData.arriveNum}</div>
              <div>反馈点数:{rowData.feedbackNum}-覆盖管线长度:{rowData.coverLineLength}</div>
              <div>累计在线时长:{rowData.onLineTimeSum}-累计在线里程:{rowData.onLineRoadSum}</div>*/}
            </Card.Body>
            <Card.Footer  content={'日均在线时长:'+rowData.onLineTimeDaySum} extra={<div>{'日均在线里程:'+rowData.onLineRoadDaySum}</div>}/>
          </Badge>
        </Card>

        <WhiteSpace size="sm"/>
      </WingBlank>
    );
  }

}
export default connect()(PartrolCountItem);
