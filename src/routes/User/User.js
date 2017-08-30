import React,{Component} from 'react'
import styles from './User.css'
import {connect} from 'dva'
import {Button} from 'antd-mobile'
class User extends Component{
  constructor(){
    super()


  }
  render(){
    const localin = _global.userInfo;
    const userInfo = [];
    userInfo.push({keyName:"用户编号",value:localin.UserID});
    userInfo.push({keyName:"登录名",value:localin.LoginName});
    userInfo.push({keyName:"用户名",value:localin.TrueName});
    userInfo.push({keyName:"角色名称",value:localin.FullRole});
    userInfo.push({keyName:"登录模式",value:"联机模式"});
    userInfo.push({keyName:"登录次数",value:localin.LoginCount});
    userInfo.push({keyName:"上次登录",value:localin.LoginTime});
      return(
        <div className={styles.normal}>
          <div className={styles.usr_image}></div>
          <ul className={styles.list}>
          {
            userInfo.map((item,index)=>{
              return <ListItem index={userInfo.indexOf(item)} {...item}/>
            })
          }
          </ul>
          <Button className={styles.btn} type="primary">退出登录</Button>
      </div>);
  }
}
class ListItem extends Component{
  constructor(){
    super()
    this.state = {}
  }
  render(){
    let {keyName,value,index}=this.props;
    const styleArr = [styles.icon_item_0,styles.icon_item_1,styles.icon_item_2,styles.icon_item_3,styles.icon_item_4,styles.icon_item_5,styles.icon_item_6];
    const iconstyle = styleArr[index];
    return (
      <li className={styles.list_item}>
        <div className={styles.left_item}>
          {/*<span className={iconstyle}></span>*/}
          <span className={styles}>{keyName}</span>
        </div>
          <span className={styles.value_text}>{value}</span>
      </li>
    );
  }

}
export default User;
