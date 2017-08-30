/**
 * Created by lyunfan on 17/6/9.
 */
import { connect } from 'dva';
import { List, Checkbox, Flex } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class CheckBoxs extends React.Component {
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

  setView(fieldName, val, checked) {
    let stateVal = this.state.val;
    if (!checked) {
      stateVal = `${stateVal},${val}`
    } else {
      const _valArr = stateVal.split(',');
      const _index = _valArr.findIndex((_itemVal, i)=> {
        return _itemVal == val;
      });
      if (_index < 0) {
        return;
      }
      _valArr.splice(_index, 1);
      stateVal = _valArr.join(',')
    }

    this.setState({val: stateVal});
    this.setVal(fieldName, stateVal);
  }

  render() {
    const {schema,scan,form}=this.props;
    const Alias = schema.Alias || schema.FieldName;
    const {val}=this.state;

    if (scan) {
      return (<List.Item key={schema.Alias}>{schema.Alias}:{val}</List.Item>);
    }

    const ConfigInfo = schema.ConfigInfo || '';
    const ConfigInfoArr = ConfigInfo.split(',');
    const dataArr = ConfigInfoArr.map((config)=> {
      const value = config;
      const label = config;
      const valTemp = `,${val},`;
      const checked = valTemp.indexOf(`,${value},`) > -1;
      return {value, label, checked};
    });

    const isRequired = schema.required || false;
    const fieldName = schema.FieldName;
    const { getFieldProps, getFieldError } =form;

    return (<div>
      <List.Item key={schema.Alias}>{schema.Alias}
        {dataArr.map((data, index)=> (
          <CheckboxItem
            {...getFieldProps(`${fieldName}`, {
              initialValue: `${val}`,
              rules: [
                {required: isRequired, message: `${fieldName}不能为空`}
              ]
            })}
            defaultChecked={data.checked} key={index}
            onChange={()=>this.setView(schema.FieldName,data.value,data.checked)}>
            {data.label}
          </CheckboxItem>
        ))}
      </List.Item>

    </div>);
  }
}
export default CheckBoxs;

