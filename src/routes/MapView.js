/**
 * Created by lyunfan on 17/7/11.
 */
import React ,{Component} from 'react';
import { connect } from 'dva';
class MapView extends React.Component {

  render() {
    return (
     <div id='mapContainer'>
        <iframe width="100%" height="100%" src='http://192.168.12.240/Web4/mobile/mapView.html' scrolling="auto" id="frame_map" name="map" marginWidth="0"
              marginHeight="0" frameBorder="no"></iframe>
     </div> )
  }
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MapView);
