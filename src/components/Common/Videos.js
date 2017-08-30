import React from 'react';
import styles from './Videos.css';

function Videos({schema={},scan=true}) {
  let paths = schema.FieldValue;
  if (!paths) {
    return (<div></div>);
  }
  paths = paths.split(',');
  return (
    <div>
      {paths.map((paths, index)=> {
        return ( <video src={_global.UpLoadFiles+paths}>
          您的浏览器不支持 video 标签。
        </video>);
      })}
    </div>
  );
}

export default Videos;
