import React from 'react';
import { List } from 'antd-mobile';
import styles from './GroupItems.css';
import AudiosComponent from './Audios';
import VideosComponent from './Videos';
import ImgsComponent from './Imgs';
import PickersComponent from './Pickers';
import TxtsComponent from './Txts';
import TimeComponent from  './Times';
import MultTxtsComponent from './MultTxts';
import RadiosComponent from './Radios';
import CheckBoxsComponent from './CheckBoxs';
function GroupItems({Schema,Values,scan,form}) {
  return (
    <List className="my-list">
      {Schema.map(function (schema, k) {
        if (schema.Visible == 0) {
          return;
        }
        //if (!schema.FieldValue) {
        //  const valItem = Values.find((val, index) => val.FieldName == schema.FieldName);
        //  if (valItem) {
        //    schema.FieldValue = valItem.FieldValue;
        //  }
        //}
        const valItem = Values.find((val, index) => val.FieldName == schema.FieldName) || {
            FieldName: schema.FieldName,
            FieldValue: ''
          };

        let val = valItem.FieldValue || '';
        if (!scan) {
          valItem.FieldValue=valItem.FieldValue||schema.PresetValue||'';
          val =  valItem.FieldValue;
        }

        const Shape = schema.Shape;

        //  if (scan) {
        //文本or多媒体
        switch (Shape) {
          case "仅时间":
          case "日期":
          case "时间":
          {
            return (<TimeComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;

          case '录音':
          {
            return (<List.Item key={k}>{schema.Alias}:<AudiosComponent schema={schema} val={val} scan={scan} form={form}/></List.Item>);
          }
            break;
          case '图片':
          case '可预览图片':
          case '拍照相册':
          case '拍照':
          {
            return (<ImgsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);

          }
            break;
          case '视频':
          {
            return (<List.Item key={k}>{schema.Alias}:<VideosComponent schema={schema} val={val} scan={scan} form={form}/></List.Item>);

          }
            break;
          case '附件':
          case '可预览附件':
          {
          }
            break;
          case "选择器"://可选值列表需要从服务获取
          case "可编辑值选择器":// 可编辑值选择器，可选值给定的下拉框同时可以编辑
          case "值选择器"://可选值列表在表架构中
          case "站点选择器":
          case "人员选择器":
          {
            return (<PickersComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "平铺值选择器":// 平铺值选择器，可选值给定的RadioButton
          {
            return (<RadiosComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "值复选器":// 值复选器，可选值给定的CheckBox
          case "值复选择器":// 值复选器，可选值给定的CheckBox
          {
            return (<CheckBoxsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "本人部门":
          {
            val = val||_global.Department || '';
            return (<TxtsComponent  key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "本人姓名":
          {
            val = val||_global.TrueName || '';
            return (<TxtsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "多行文本":
          {

            return (<MultTxtsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          case "参数":
          {
            return (<TxtsComponent key={k} schema={schema} val={val} scan={true} form={form}/>);
          }break;
          case "附件":
          case "可预览附件":
          {
            return (<TxtsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }break;
          case "常用语"://不支持
          case "设备选择"://不支持
          case "坐标控件"://不支持
          case "地址"://不支持
          case "区域控件"://不支持
          case "路径控件":
          case "文本":

          {

            return (<TxtsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
            break;
          default:
          {
            //文本TxtsComponent
            return (<TxtsComponent key={k} schema={schema} val={val} scan={scan} form={form}/>);
          }
        }
        // } else {

        //switch (Shape) {
        //  case "选择器"://可选值列表需要从服务获取
        //  case "值选择器"://可选值列表在表架构中
        //  {
        //     return (<PickersComponent schema={schema} scan={scan}/>);
        //  }
        //    break;
        //
        //  case "动态值选择器":
        //  {
        //  }
        //    break;
        //  case "值复选器":
        //  case "值复选择器":
        //  {
        //  }
        //    break;
        //  case "平铺值选择器":
        //  {
        //  }
        //    break;
        //  case "可编辑值选择器":
        //  {
        //  }
        //    break;
        //  case "站点选择器":
        //  {
        //  }
        //    break;
        //  case "多行文本":
        //  {
        //  }
        //    break;
        //  case "可预览图片":
        //  case "图片":
        //    if ("拍照相册".equals(PresetValue)) {
        //      gdControl.Type = "图片";//拍照和从相册选取
        //    } else {
        //      gdControl.Type = "拍照";//仅拍照
        //    }
        //    break;
        //  case "拍照":
        //    //测试类型(Mobile端自己添加的类型（Web端没有），仅供Mobile内部使用)
        //  {
        //  }
        //    break;
        //  case "拍照相册":
        //    //测试类型(Mobile端自己添加的类型（Web端没有），仅供Mobile内部使用)
        //  {
        //  }
        //    break;
        //  case "录音":
        //  {
        //  }
        //    break;
        //  case "视频":
        //  {
        //  }
        //    break;
        //  case "坐标控件":
        //    //默认是绑定地址的坐标
        //    //gdControl.Type = "坐标V2";
        //    //
        //    //if ("当前坐标".equals(ConfigInfo)) {
        //    //  gdControl.Type = "当前坐标";
        //    //  gdControl.IsRead = "false";
        //    //}
        //  {
        //  }
        //    break;
        //  case "坐标控件V3":
        //  {
        //  }
        //    break;
        //  case "地址":
        //  {
        //  }
        //    break;
        //  case "附件":
        //  case "可预览附件":
        //  {
        //  }
        //    break;
        //  case "参数":
        //  {
        //  }
        //    break;
        //  case "文本":
        //  {
        //  }
        //    break;
        //  case "坐标V2":
        //  case "距离":
        //  case "常用语":
        //  case "本人部门":
        //  case "本人姓名":
        //  case "区域控件":
        //  case "设备选择":
        //  case "人员选择器":
        //  {
        //  }
        //    break;
        //  case "场站设备选择器":
        //  {
        //  }
        //    break;
        //  default:
        //  {
        //  }
        //    break;
        //}

        //  }
        // return (<List.Item>{schema.Alias}:{schema.FieldValue}</List.Item>);
      })}
    </List>
  );
}

export default GroupItems;
