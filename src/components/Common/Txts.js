/**
 * Created by lyunfan on 17/8/15.
 */
import { InputItem,List } from 'antd-mobile';
import {getSchemaRule,isEmail,isCardNo} from '../../utils/common';
class Txts extends React.Component {

  validateTxts = (rule, value, callback) => {
    let {schema}=this.props;
    const validateTypeRule=schema.validateTypeRule;
    let isValidated=true;
    switch (validateTypeRule){
      case 'email':{
        if(!isEmail(value)){
          isValidated=false;
          callback(new Error(`${schema.Alias}格式填写不正确`));
        }
      }break;
      case 'identity':{
        if(!isCardNo(value)){
          isValidated=false;
          callback(new Error(`${schema.Alias}格式填写不正确`));
        }
      }break;
    }
    if(isValidated){
      callback();
    }

  }

  render() {

    let {schema,val,scan,form}=this.props;
    const Alias=schema.Alias;
    if (scan) {
      return (<List.Item key={Alias}>{Alias}:{val}</List.Item>);
    }

    const extra = schema.Unit || '';

    schema = getSchemaRule(schema);

    const isRequired = schema.required;
    const maxLength = schema.maxLength;
    let typeRule = schema.typeRule;

    const fieldName=schema.FieldName;

    const { getFieldProps, getFieldError } =form;
    return (
      <InputItem
        {...getFieldProps(`${fieldName}`, {
          initialValue: `${val}`,
          rules: [
            {required: isRequired, message: `${fieldName}不能为空`},
            {validator: this.validateTxts},
          ]
        })}
        type={typeRule}
        extra={extra}
        clear
        placeholder={Alias}
        defaultValue={val}
      >{isRequired ? <label style={{color: 'red'}}>*</label> : ''} {schema.Alias}</InputItem>
    );
  }
}
export default Txts;
