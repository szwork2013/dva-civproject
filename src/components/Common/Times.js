import { connect } from 'dva';
import { List,DatePicker } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {getSchemaRule} from '../../utils/common';

class Times extends React.Component {
  constructor(props) {
    super(props);
    const {val}=this.props;

    this.state = {
      val: val
    }
  }

  setVal(fieldName, val) {
    const value = {};
    value[fieldName] = val;
    this.props.form.setFieldsValue(value);
  }

  setView(fieldName, val) {
    const _d = val._d;
    const year = _d.getFullYear();
    const month = _d.getMonth() + 1;
    const day = _d.getDate();

    const h = _d.getHours();
    const m = _d.getMinutes();
    const s = val._d.getSeconds()

    let timeStr = '';
    const {schema}=this.props;

    switch (schema.Shape) {
      case "仅时间":
      {
        timeStr = `${h}:${m}`;

      }
        break;
      case "日期":
      {
        timeStr = `${year}-${month}-${day}`;
      }
        break;
      case "时间":
      {
        timeStr = `${year}-${month}-${day} ${h}:${m}`;
      }
        break;
      default:
      {
        timeStr = `${year}-${month}-${day} ${h}:${m}`;
      }
    }
    this.setState({val: timeStr});
    this.setVal(fieldName, timeStr);
  }

  render() {

    let {schema}=this.props;
    const {scan,form}=this.props;
    const Alias = schema.Alias || schema.FieldName;
    const {val}=this.state;

    if (scan) {
      return (<List.Item key={schema.Alias}>{schema.Alias}:{val}</List.Item>);
    }
    const shape = schema.Shape;

    let defaultVal = val;

    const isDefaultEmpty = schema.ConfigInfo == '默认为空';

    let mode = 'datetime';
    switch (shape) {
      case "仅时间":
      {
        mode = 'time';

        if (defaultVal) {
          defaultVal = moment(`${defaultVal}`, 'HH:mm Z');
        }
        if (!defaultVal && !isDefaultEmpty) {
          defaultVal = moment().locale('zh-cn');
        }
      }
        break;
      case "日期":
      {
        mode = 'date';
        if (defaultVal) {
          defaultVal = moment(`${defaultVal}`, 'YYYY-MM-DD Z');
        }
        if (!defaultVal && !isDefaultEmpty) {
          defaultVal = moment().locale('zh-cn');
        }
      }
        break;
      case "时间":
      {
        mode = 'datetime';
        if (defaultVal) {
          defaultVal = moment(`${defaultVal}`, 'YYYY-MM-DD HH:mm Z');
        }
        if (!defaultVal && !isDefaultEmpty) {
          defaultVal = moment().locale('zh-cn');
        }
      }
        break;
      default:
      {
        mode = 'datetime';
        if (defaultVal) {
          defaultVal = moment(`${defaultVal}`, 'YYYY-MM-DD HH:mm Z');
        }
        if (!defaultVal && !isDefaultEmpty) {
          defaultVal = moment().locale('zh-cn');
        }
      }
    }


    schema = getSchemaRule(schema);

    const required = schema.required;
    const fieldName = schema.FieldName;
    const { getFieldProps, getFieldError } =form;

    return (
      <DatePicker
        {...getFieldProps(`${fieldName}`, {
          initialValue: `${val}`,
          rules: [
            {required: required, message: `${fieldName}不能为空`}
          ]
        })}
        mode={mode}
        onChange={date => this.setView(schema.FieldName,date)}
        value={defaultVal}
        extra={val}
      >
        <List.Item arrow="horizontal">{required ?
          <label style={{color: 'red'}}>*</label> : ''}{schema.Alias}</List.Item>
      </DatePicker>
    );
  }
}

export default Times;
