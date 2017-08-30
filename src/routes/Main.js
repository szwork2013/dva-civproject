import React from 'react';
import { connect } from 'dva';
import { TabBar, Icon } from 'antd-mobile';
import DoingCasesComponent from '../components/DoingBox/DoingCases';
function Main() {

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
    >
      <TabBar.Item
        title="生活"
        key="生活"
        icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
        selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
        selected={true}
        badge={1}
        onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
        data-seed="logId"
      >
        <DoingCasesComponent/>
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon type="koubei-o" size="md" />}
        selectedIcon={<Icon type="koubei" size="md" />}
        title="口碑"
        key="口碑"
        badge={'new'}
        selected={false}
        onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}
        data-seed="logId1"
      >

      </TabBar.Item>
      <TabBar.Item
        icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
        selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
        title="朋友"
        key="朋友"
        dot
        selected={false}
        onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
      >

      </TabBar.Item>
      <TabBar.Item
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
        title="我的"
        key="我的"
        selected={false}
        onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
      >

      </TabBar.Item>
    </TabBar>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Main);
