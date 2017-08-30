import React,{Component} from 'react';
import Recorder from './recorder';
import './Audios.css';
import audio from './audio.svg';
import {getBrowserInfo} from '../../../utils/common';




class Audios2 extends Component{

  constructor(){
    super();
    this.state = {
      audios:[],
      recorder:'',
      startButton:true,
      stopButton:true,
      audio_context:'',
    }
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);

  }
  startRecord(){

    let recorder = this.state.recorder;
      recorder && recorder.record();
      this.setState({
        startButton:true,
        stopButton:false,
      });
      alert('record....');
  }
  stopRecord(){
    let This = this;
    let arr = this.state.audios;
    let recorder = this.state.recorder;
    recorder && recorder.stop();
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      arr.push({url});
      This.setState({
        startButton:true,
        stopButton:false,
        audios:arr
      });
      This.forceUpdate();
    });

    recorder.clear();
    alert('stoping...');

  }
  componentWillMount(){
    var This = this;

    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      This.setState({
        audio_context:new AudioContext()
      })

    } catch (e) {
      alert('No web audio support in this browser!');
    }
    navigator.getUserMedia({audio: true}, function (stream) {
      var audioCtx = new AudioContext();
      var source = audioCtx.createMediaStreamSource(stream);
      This.setState({
        recorder:new Recorder(source)
      });
    },function (e) {

    });

    // window.onload = function init() {
    //   try {
    //     // webkit shim
    //     window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    //     window.URL = window.URL || window.webkitURL;
    //     This.setState({
    //       audio_context:new AudioContext()
    //     })
    //
    //   } catch (e) {
    //     alert('No web audio support in this browser!');
    //   }
    //   navigator.getUserMedia({audio: true}, function (stream) {
    //     var audioCtx = new AudioContext();
    //     var source = audioCtx.createMediaStreamSource(stream);
    //     This.setState({
    //       recorder:new Recorder(source)
    //     })
    //   }, function(e) {
    //   });
    // };
  }
  componentDidMount(){

  }
  shouldComponentUpdate(np,ns){

  }
  componentWillUpdate(np,ns){

  }
  render(){
    let This =this;
    let arr = this.state.audios;
    let recorder = this.state.recorder;
    return(
      <div>
        <img className="iconfont" src={audio} onClick={this.startRecord.bind(this)}></img>
        <img className="iconfont" src={audio} onClick={this.stopRecord.bind(this)}></img>
        <ul>
          {
            This.state.audios.map((item,index)=>{
                  return<audio controls={true} src={item.url}></audio>
              })
          }
        </ul>
      </div>
    )
  }


}

export default Audios2;
