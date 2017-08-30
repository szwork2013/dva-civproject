import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { ImagePicker } from 'antd-mobile';
import { List } from 'antd-mobile';
import styles from './Imgs.css';

import {isImg} from '../../utils/common';
//<List.Item>{schema.Alias}:<ImgsComponent schema={schema} val={val} scan={scan}/></List.Item>

//function createImgScanView(pathArr) {
//
//  if (!pathArr) {
//    return;
//  }
//  if (pathArr.length == 0) {
//    return;
//  }
//  let hmtlArr = [];
//  pathArr.map(function (path, i) {
//    hmtlArr.push(`<img src=${global.UpLoadFiles+path}/>`)
//  });
//  return hmtlArr.join('');
//}
function Imgs({dispatch,schema={},val,scan=true}) {

  const onAddImageClick = ()=> {
    //const fieldName=schema.fieldName;
    //dispatch({
    //  type: 'CaseHand/editVal',
    //  payload: {fieldName, val}
    //});
  };


  const onChange = (files, operationType, index)=> {
    // alert(operationType);
    const fieldName = schema.FieldName;

    let valArr = [];
    files.map(function (file, index) {
      let valItem = file.url;
      valItem = valItem.replace(',', '，');
      valArr.push(valItem);
    });
    const val = valArr.join(',');

    dispatch({
      type: 'CaseHand/editVal',
      payload: {fieldName, val}
    });

    //const addFile = files[files.length - 1]
    //let val = addFile.url;
    //val = val.replace(',', '，');
    //let type = 'add';
    //if (operationType == 'add') {
    //  type = 'append';
    //  //const base64=val.split(',')[1];
    // // val = val.replace(',', '，');
    //  dispatch({
    //    type: 'CaseHand/editVal',
    //    payload: {fieldName, val, type}
    //  });
    //} else {
    //  type = 'remove';
    //  dispatch({
    //    type: 'CaseHand/editVal',
    //    payload: {fieldName, val, type}
    //  });
    //}
  };


  let pathArr = [];
  if (val) {
    pathArr = val.split(',');
  }
  if (!pathArr) {
    pathArr = [];
  }

  //if (scan) {
  //  if (pathArr.length == 0) {
  //    return (<List.Item>{schema.Alias}</List.Item>);
  //  }
  //
  //  return (<List.Item>{schema.Alias}{createImgScanView(pathArr)}</List.Item>);
  //}
  let files = [];
  let j=0;
  for (let i = 0; i < pathArr.length; i++) {
    const path = pathArr[i];
    if (!isImg(path)) {
      continue;
    }
    let url = path;
    if (path.indexOf('base64') < 0) {
      if (path.indexOf('http') < 0) {
        url = _global.UpLoadFiles + path;
      }
    } else {
      url = url.replace('，', ',');
    }
    const file =
    {
      url: url,
      id: j
    }
    files.push(file);
    j++;
  }

  const onImgClick=(index)=>{
    dispatch(routerRedux.push({
      pathname: '/ImgsShowView',
      state: {files,index}
    }));
  }


  return (
    <List.Item>{schema.Alias}
      <ImagePicker
        files={files}
        onChange={(files, operationType, index)=>onChange(files, operationType, index)}
        onImageClick={(index, fs) => onImgClick(index)}
        selectable={!scan}
        onAddImageClick={onAddImageClick}
      />
    </List.Item>
  );
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Imgs);
