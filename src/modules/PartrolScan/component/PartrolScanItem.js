import React,{Component} from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './PartrolScanItem.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast,PickerView,Progress} from 'antd-mobile';

class PartrolScanItem extends Component{
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
            <Card.Body>
              <div className={styles.card_body}>
                <div>{rowData.Name}</div>
                <div>{rowData.CycleName}</div>
              </div>
              <div className={styles.card_body}>
                <div>到位:{rowData.ArriveSum}/{rowData.TotalSum}</div>
                <div className={styles.progress}><Progress percent={rowData.ArriveSum/rowData.TotalSum} position="normal" /></div>
              </div>
              <div className={styles.card_body}>
                <div>反馈:{rowData.FeedbackSum}/{rowData.TotalSum}</div>
                <div className={styles.progress}><Progress percent={rowData.FeedbackSum/rowData.TotalSum} position="normal" /></div>
              </div>
              <div className={styles.card_body}>
                <div>管段:{rowData.PipeLenth}/{rowData.TotalLength}</div>
                <div className={styles.progress}><Progress percent={rowData.PipeLenth/rowData.TotalLength} position="normal" /></div>
              </div>
              <div className={styles.card_body}>
                <div>{rowData.Code}</div>
                <div>{rowData.StartTime}</div>
              </div>
              <div className={styles.card_body}>
                <div>巡线员姓名:{rowData.userNames}</div>
              </div>
            </Card.Body>
          </Badge>
        </Card>

        <WhiteSpace size="sm"/>
      </WingBlank>
    );
  }

}
export default connect()(PartrolScanItem);
