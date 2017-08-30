import React ,{Component} from 'react'
import { connect } from 'dva';
import { TabBar,Icon} from 'antd-mobile';
import Header from '../components/Header/Header'

import AppMain from './AppMain'
import MapView from './MapView'
import Home from '.././svg/user_name.svg'
import styles from './AppIndex.css'
import User from './User/User'
export default class AppIndex extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '首页',
      hidden: false,
    };
  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>
          你已点击“{pageText}” tab， 当前展示“{pageText}”信息

        </div>

        <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }}
           onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }

  render(){
    return (
      <div className="fullScreen">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<div className={styles.home_icon}/>
          }
          selectedIcon={<div className={styles.home_icon_select}/>
          }
          selected={this.state.selectedTab === '首页'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: '首页',
            });
          }}
          data-seed="logId"
        >
          <AppMain className="fullScreen"/>
        </TabBar.Item>
        <TabBar.Item
          icon={<div className={styles.map_icon}/>}
          selectedIcon={<div className={styles.map_icon_select}/>}
          title="地图"
          key="地图"
          selected={this.state.selectedTab === '地图'}
          onPress={() => {
            this.setState({
              selectedTab: '地图',
            });
          }}
        >
         <MapView className="fullScreen"/>
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div className={styles.usr_icon}/>
          }
          selectedIcon={
            <div className={styles.usr_icon_select}/>
          }
          title="我的"
          key="我的"
          dot
          selected={this.state.selectedTab === '我的'}
          onPress={() => {
            this.setState({
              selectedTab: '我的',
            });
          }}
        >
          <User className="fullScreen"/>
        </TabBar.Item>
      </TabBar>
      </div>
    );
  }
}
