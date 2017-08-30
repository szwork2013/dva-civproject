import React,{Component} from 'react'
import styles from './Login.css'
import {connect} from 'dva'
import {Icon,InputItem} from 'antd-mobile'



class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      userName:'',
      passWord:'',
    }
    this.login = this.login.bind(this);
    this.userChange= this.userChange.bind(this);
  }
  login(){
    let This =this;
    let userName = this.state.userName;
    let passWord = this.state.passWord;
    This.props.dispatch({type:'Login/fetchUser',payload:{userName,passWord}})
  }
  userChange(event){
    this.setState({userName:event.target.value})
  }
  passChange(event){
    this.setState({passWord:event.target.value})
  }
  render(){
    let This = this;

    return(
      <div className={styles.login}>
        <div className={styles.logo}></div>
        <div className={styles.userName}>
          <div className={styles.userPng}></div>
          <input className={styles.userput} type="text" onChange={this.userChange.bind(this)}/>
        </div>
        <div className={styles.passWord}>
          <div className={styles.passPng}></div>
          <input className={styles.passput} type="password" onChange={this.passChange.bind(this)}/>
        </div>
        <div className={styles.login_button} onClick={This.login.bind(this)}>
          <div className={styles.login_text}>登录</div>
        </div>
      </div>
    );
  };
}
function mapStateToProps(state) {
  const { DataMenuList} = state.DataMenuList||[];
  return {
    DataMenuList
  };
}

export default connect(mapStateToProps)(Login);
