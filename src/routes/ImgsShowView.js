/**
 * Created by lyunfan on 17/5/25.
 */
import React from 'react';
import { connect } from 'dva';
import { Carousel, WingBlank, WhiteSpace } from 'antd-mobile';

function ImgsShowView({files,selectedIndex}) {

  files=files||[];
  selectedIndex = selectedIndex || 0;

  return (
    <Carousel
      style={{width:'100%',height:'100%',align:'center'}}
      autoplay={false}
      selectedIndex={selectedIndex}
      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      afterChange={index => console.log('slide to', index)}
    >
      {files.map((img,index) => (
          <img
            key={index}
            style={{width:'100%',height:'100%',align:'center'}}
            src={img.url}
            alt="icon"
            onLoad={(m,k,n) => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));

                }}
          />
      ))}
    </Carousel>

  );
}

function mapStateToProps(state, ownProps) {
  const {files,index:selectedIndex}=ownProps.location.state;
  return {files,selectedIndex};
}

export default connect(mapStateToProps)(ImgsShowView);


