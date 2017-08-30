import React,{Component} from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './MainTainMaterialListItem.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast,PickerView} from 'antd-mobile';

class MaintainMaterialListItem extends Component{
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
                <div>耗材名称:{rowData.Name}</div>
                <div>耗材数量:{rowData.Num}</div>
                <div>耗材单位:{rowData.Unit}</div>
              </div>
            </Card.Body>
          </Badge>
        </Card>

        <WhiteSpace size="sm"/>
      </WingBlank>
    );
  }

}
export default connect()(MaintainMaterialListItem);
