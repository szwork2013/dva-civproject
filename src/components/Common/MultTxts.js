import React from 'react';
import { connect } from 'dva';
import { TextareaItem,List } from 'antd-mobile';
import {getSchemaRule} from '../../utils/common';

class MultTxts extends React.Component {
  render() {

    let {schema}=this.props;
    const {val,scan,form}=this.props;
    const Alias = schema.Alias || schema.FieldName;

    const placeholder = schema.ConfigInfo||Alias|| '';
    let rows = schema.ColSpan || 3;
    //个数显示需占有一行
    if (rows == 1) {
      rows = 2;
    }

    schema = getSchemaRule(schema);

    const required = schema.required;
    const maxLength = schema.maxLength;
    const fieldName = schema.FieldName;

    if(scan){
      return (
        <List.Item key={schema.Alias}>{schema.Alias}
          <TextareaItem
            editable={!scan}
            rows={rows}
            count={maxLength}
            value={val}
          /></List.Item>
      );
    }
    const { getFieldProps, getFieldError } =form;

    return (
      <List.Item key={schema.Alias}>{schema.Alias}
        <TextareaItem
          {
            ...getFieldProps(`${fieldName}`, {
              initialValue: `${val}`,
              rules: [
                {required: required, message: `${fieldName}不能为空`}
              ]
            })
          }
          editable={!scan}
          placeholder={placeholder}
          rows={rows}
          count={maxLength}
        /></List.Item>
    );
  }
}

export default MultTxts;
