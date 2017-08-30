/**
 * Created by lyunfan on 17/5/4.
 */
import {Toast} from 'antd-mobile';
//获取浏览器型号 以及对应的版本号 safari|53
export function getBrowserInfo() {
  var agent = navigator.userAgent.toLowerCase();

  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
//IE
  if (agent.indexOf("msie") > 0) {
    return agent.match(regStr_ie);
  }

//firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStr_ff);
  }

//Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStr_chrome);
  }

//Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStr_saf);
  }

}

export function isImg(url) {

  if (!url) {
    return false;
  }
  if (url.indexOf('jpeg') >= 0) {
    return true;
  }
  if (url.indexOf('JPEG') >= 0) {
    return true;
  }
  if (url.indexOf('png') >= 0) {
    return true;
  }
  if (url.indexOf('PNG') >= 0) {
    return true;
  }

  if (url.indexOf('jpg') >= 0) {
    return true;
  }
  if (url.indexOf('JPG') >= 0) {
    return true;
  }

  return false;

}

export function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(str);
}

export function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

export function caseItem2CaseInfo(caseItem) {
  if (!caseItem) {
    return {};
  }

  let caseInfo = {};
  caseInfo.UserID = _global.userInfo.uid;
  caseInfo.StepID = caseItem.StepID;
  caseInfo.CaseNo = caseItem.CaseNo;
  caseInfo.FlowName = caseItem.FlowName;
  caseInfo.NodeName = caseItem.ActiveName;
  caseInfo.Direction = caseItem.Direction
  caseInfo.TableGroup = "";

  // 不能要
  // caseInfo.Opinion = this.Opinion;
  // caseInfo.Undertakeman = this.UnderTakeMan;

  caseInfo.Station = caseItem.Station;
  caseInfo.CloseEvent = caseItem.CloseEvent;

  //事件配置信息
  caseInfo.EventCode = caseItem.EventCode;
  caseInfo.EventName = caseItem.EventName;
  caseInfo.EventMainTable = caseItem.EventMainTable;
  caseInfo.FieldGroup = caseItem.FieldGroup;

  caseInfo.IsCreate = caseItem.IsCreate;

  return caseInfo;
}

export function getSchemaRule(schema) {
  let required = false;
  let maxLength = 250;
  let typeRule = 'text';
  let validateTypeRule = 'text';
  const ValidateRule = schema.ValidateRule || '';
  const ruleArr = ValidateRule.split(',');
  ruleArr.map(function (rule, index) {
    if (rule == 'required') {
      required = true;
      return;
    }
    if (rule.indexOf('maxlength') >= 0) {
      maxLength = rule.split(':')[1] || 500;
      return;
    }

    if (rule.indexOf('number') >= 0) {
      typeRule = 'number';
      validateTypeRule = 'number';
      return;
    }
    if (rule.indexOf('email') >= 0) {
      typeRule = 'text';
      validateTypeRule = 'email';
      return;
    }
    if (rule.indexOf('identity') >= 0) {
      typeRule = 'text';
      validateTypeRule = 'identity';
      return;
    }
    if (rule.indexOf('mobile') >= 0) {
      typeRule = 'phone';
      validateTypeRule = 'mobile';
      return;
    }
    if (rule.indexOf('bankAccount') >= 0) {
      typeRule = 'bankCard';
      validateTypeRule = 'bankAccount';
      return;
    }

  });

  schema.required = required;
  schema.maxLength = maxLength;
  schema.typeRule = typeRule;
  schema.validateTypeRule = validateTypeRule;

  return schema;

}

export function validateFormFields(form, callBack) {
  if (!form) {
    return;
  }
  form.validateFields({force: true}, (error) => {
    if (!error) {
      if (typeof(callBack) == 'function') {
        callBack();
      }
    } else {
      //alert('校验失败');
      for (const key in error) {
        Toast.fail(error[key].errors[0].message, 2);
        break;
      }
    }
  });
}
