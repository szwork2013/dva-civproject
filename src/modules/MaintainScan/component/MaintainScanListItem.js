import React,{Component} from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './MaintainScanListItem.css';
import { Card,Badge, WingBlank, WhiteSpace ,Toast,PickerView} from 'antd-mobile';

class MaintainScanListItem extends Component{
  constructor(props,context){
    super(props,context);
    const {dispatch} = this.props;

    this.onItemClick = ()=> {
      const {rowData} = this.props;
      const webRow = rowData.WebRow||[];
      dispatch(routerRedux.push({
        pathname: '/MaintainScanDetail',
        query: rowData
      }));
    };

  }
  render(){
    const {rowData} = this.props;
    const webRow = rowData.WebRow||[];

    return(
      <WingBlank size="sm">
        <WhiteSpace size="sm"/>

        <Card onClick={this.onItemClick}>
          <Badge text='123'  corner>
            <Card.Header/>
            <Card.Body>
              {webRow.map((item,index)=>{
                return(<div>{item.FieldName+':'+item.FieldValue}</div>)
              })}
            </Card.Body>
            <Card.Footer/>
          </Badge>
        </Card>

        <WhiteSpace size="sm"/>
      </WingBlank>
    );
  }

}
export default MaintainScanListItem;
