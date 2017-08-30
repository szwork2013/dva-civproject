import { connect } from 'dva';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import {post,request} from '../../utils/request';

class Pickers extends React.Component {
  constructor(props) {
    super(props);
    const {val,schema}=this.props;

    this.state = {
      val: val,
      schema: schema
    }

  }

  setVal(fieldName, val) {
    const value = {};
    value[fieldName] = val;
    this.props.form.setFieldsValue(value);
  }

  setView(fieldName, val) {
    this.setState({val: val});
    this.setVal(fieldName, val);
  }

  GetStationListByUserID(callBack) {
    const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/CommonModule/GetStationListByUserID?userID=${_global.userInfo.uid}`;
    return request(url, 'json', callBack);
  }

  GetMenTreeByRole(role, callBack) {
    const url = `${_global.ipPort}/CityInterface/Services/Zondy_MapGISCitySvr_CaseManage/REST/CaseManageREST.svc/WorkFlow/GetMenTreeByRole?role=${role}&userID=${_global.userInfo.uid}`;
    return request(url, 'json', callBack);
  }

  getDataDictionaryList(nodeNameArr, callBack) {
    const url = `${_global.ipPort}/CityInterface/Services/MapgisCity_WorkFlow/REST/WorkFlowREST.svc/GetDataDictionaryList?nodeNameArr=${nodeNameArr}`;
    return request(url, 'json', callBack);
  }

  componentDidMount() {
    const {schema,scan}=this.props;
    if (scan) {
      return;
    }

    if(typeof(schema.chooseList) !='undefined'){
      return;
    }

    const me = this;

    switch (schema.Shape) {

      case "站点选择器":
      {
        this.GetStationListByUserID(function (data) {
          // alert(JSON.stringify(data));
          schema.chooseList = data.getMe;
          me.setState({schema: schema});
        });
      }
        break;
      case "人员选择器":
      {

        this.GetMenTreeByRole(schema.ConfigInfo, function (data) {
          const ChildNodes= data.ChildNodes||[];
          schema.chooseList=ChildNodes.map(function(item){
            return item.Text;
          })
          me.setState({schema: schema});
        })
      }
        break;
      case "选择器":
      {
        this.getDataDictionaryList(schema.ConfigInfo, function (data) {
          const childList=data[0].childList||[];
          schema.chooseList=childList.map(function(item){
            return item.NODENAME;
          })
          me.setState({schema: schema});
        })
      }
        break;
      default:
      {
        schema.chooseList = schema.ConfigInfo.split(',');
        me.setState({schema: schema});
      }
    }

  }

  render() {
    const {scan,form}=this.props;
    const {schema,val}=this.state;
    const Alias = schema.Alias || schema.FieldName;
    if (scan) {
      const val = schema.FieldValue || '';
      return (<List.Item key={Alias}>{Alias}:{val}</List.Item>);
    }


    //let configInfo = schema.ConfigInfo || '';
    //let configInfos = configInfo ? configInfo.split(',') : [];

    let chooseList = schema.chooseList || [];
    //if (!configInfos || configInfos.length == 0 || configInfos[0] == '') {
    //  const fieldName = schema.FieldName;
    //  switch (schema.Shape) {
    //    case "选择器":
    //    {
    //
    //    }
    //      break;//可选值列表需要从服务获取
    //    //case "可编辑值选择器":// 可编辑值选择器，可选值给定的下拉框同时可以编辑
    //    //case "值选择器":
    //    //{
    //    //  configInfos = configInfo.split(',');
    //    //}
    //    //  break;//可选值列表在表架构中
    //    case "站点选择器":
    //    {
    //      //count++;
    //      configInfos = _global.getLocalStorage('StationList2');
    //      if (!configInfos||configInfos.length==0) {
    //        dispatch({
    //          type: 'CaseHand/GetStationListByUserID',
    //          payload: {fieldName}
    //        });
    //      }
    //
    //    }
    //      break;
    //    case "人员选择器":
    //    {
    //    }
    //      break;
    //    default:
    //    {
    //    }
    //  }
    //}
    //configInfos=configInfos||[];
    const data = chooseList.map(function (config) {
      const item = {
        label: config, value: config
      }
      return item;

    });

    const extra = val || '请选择';

    const isRequired = schema.required || false;
    const fieldName = schema.FieldName;
    const { getFieldProps, getFieldError } =form;

    return (
      <Picker
        {...getFieldProps(`${fieldName}`, {
          initialValue: `${val}`,
          rules: [
            {required: isRequired, message: `${fieldName}不能为空`}
          ]
        })}
        value={[val]}
        key={Alias} data={data} extra={extra} cols={1} className="forss"
        onOk={v => this.setView(fieldName,v[0])}>
        <List.Item arrow="horizontal">{Alias}</List.Item>
      </Picker>
    );
  }

}

export default Pickers;
