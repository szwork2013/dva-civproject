import React from 'react';
import { connect } from 'dva';
import styles from './CaseProcedure.css';
import { Steps, WingBlank, WhiteSpace, Icon } from 'antd-mobile';

const Step = Steps.Step;
//        // const {步骤名称,承办人,承办时间,办完时间,处理时长,承办意见}=item;
function CaseProcedure({procedures}) {
  return (
    <WingBlank size="lg">
      <WhiteSpace />
      <Steps size="small" current={procedures.length-1}>
        {procedures.map(function (item, index) {
            const {步骤名称,承办人,承办时间,办完时间,处理时长,承办意见}=item;
            const title = `${item.步骤名称}-${item.承办人}`;
            let des = `承办时间:${承办时间.replace('T',' ')} 办完时间:${办完时间||''} 处理时长:${处理时长||''} 承办意见:${承办意见||''}`;
            return <Step key={index} title={title} description={des}/>
          }
        )}
      </Steps>
    </WingBlank>
  );
}
function mapStateToProps(state) {
  //alert('procedure')
  const {procedures}=state.CaseProcedures;
  return {procedures};
}
export default connect(mapStateToProps)(CaseProcedure);
