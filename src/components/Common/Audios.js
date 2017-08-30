import React from 'react';
import styles from './Audios.css';

function Audios({schema={},scan=true}) {
  let paths = schema.FieldValue;
  if (!paths) {
    return (<div></div>);
  }
  paths = paths.split(',');
  return (
    <div>
      {paths.map((paths, index)=> {
        return ( <audio src={_global.UpLoadFiles+paths}>
          您的浏览器不支持 audio 标签。
        </audio>);
      })}
    </div>
  );
}

export default Audios;
