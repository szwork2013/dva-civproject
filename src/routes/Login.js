import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Login.css'
import welcome_logo from '../images/welcome_logo.png';
class Login extends React.Component {
  render() {
    const { getFieldProps } = this.props.form;
    const defaultValues = ['admin', 'admin', 'http://192.168.12.193'];

    return (
      <div className='LoginContainer'>
        <div
          className={styles.icoContainer}>
          <img src={welcome_logo} />
        </div>
        <List className={styles.inputContainer}>
          <InputItem
            {...getFieldProps('userName', { initialValue: defaultValues[0] }) }
            placeholder="用户名"
            clear
          >
            <div
              style={{ backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}
              className={styles.userNameIcon}
            />
          </InputItem>
          <InputItem
            {...getFieldProps('password', { initialValue: defaultValues[1] }) }
            type="password"
            placeholder="密码"
          >
            <div
              style={{ backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}
              className={styles.passWordIcon}
            />
          </InputItem>
          <InputItem
            {...getFieldProps('serverHost', { initialValue: defaultValues[2] }) }
            placeholder="服务器"
            clear
          >
            <div
              style={{ backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}
              className={styles.serverHostIcon}
            />
          </InputItem>
        </List>
        <div onClick={() => {
          let userName = getFieldProps('userName').value || defaultValues[0];
          let password = getFieldProps('password').value || defaultValues[1];
          let serverHost = getFieldProps('serverHost').value || defaultValues[2];

          this.props.dispatch({ type: 'Login/login', payload: userName, password, serverHost });
        }} className={styles.loginBtnContainer}>
          <Button className="btn" type="primary">登 录</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.Login || {};
}

const LoginForm = createForm()(Login);

export default connect(mapStateToProps)(LoginForm);

