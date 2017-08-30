import React ,{Component} from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List,Icon} from 'antd-mobile';
import Header from '../components/Header/Header'

const Item = List.Item;


function FlowCenter({dispatch,eventDic}) {
  if (!eventDic) {
    return (<Icon className='center' size='lg' type="loading"/>);
  }
  const itemRender = (event, i)=> {
    return (<Item
      key={i}
      arrow="horizontal"
      onClick={() => {
        dispatch(routerRedux.push({
              pathname: '/EventReport',
              state:event
            }));
    }}
    >
      {event.EventName}
    </Item>)
  }

  let flowCenterList = [];
  for (const key in eventDic) {
    flowCenterList.push((<List renderHeader={function(){return `${key}`}} className="my-list" key={key}>
      {eventDic[key].map((event, i)=> {
        return itemRender(event, i);
      })}

    </List>));
  }

  return (
    <div>
      {flowCenterList}
    </div>
  );
}
function mapStateToProps(state, ownProps) {

  const {eventDic}=state.FlowCenter;
  return {eventDic};

}

export default connect(mapStateToProps)(FlowCenter);

