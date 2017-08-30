import React from 'react';
import { connect } from 'dva';
import { List ,Radio,Flex} from 'antd-mobile';
import {getSchemaRule} from '../../utils/common';
const RadioItem = Radio.RadioItem;

class Radios extends React.Component {
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
    this.setState({val: val});
    this.setVal(fieldName, val);
  }

  render() {
    let {schema}=this.props;
    const {scan,form}=this.props;
    const Alias = schema.Alias || schema.FieldName;
    const {val}=this.state;

    if (scan) {
      return (<List.Item key={schema.Alias}>{schema.Alias}:{val}</List.Item>);
    }
    const ConfigInfo = schema.ConfigInfo || '';
    const ConfigInfoArr = ConfigInfo.split(',');

    let dataArr = ConfigInfoArr.map(function (item, index) {
      const data =
      {
        value: item,
        label: item
      };
      return data;
    });
    schema = getSchemaRule(schema);

    const required = schema.required;
    const fieldName = schema.FieldName;
    const { getFieldProps, getFieldError } =form;

    return (
      <List.Item key={schema.Alias}>{schema.Alias}
        {dataArr.map(data => (
          <RadioItem
            {...getFieldProps(`${fieldName}`, {
              initialValue: `${val}`,
              rules: [
                {required: required, message: `${fieldName}不能为空`}
              ]
            })}
            key={data.value} checked={val === data.value}
                     onChange={() => this.setView(schema.FieldName,data.value)}
          >
            {data.label}
          </RadioItem>
        ))}
      </List.Item>
    );
  }
}
export default Radios;
