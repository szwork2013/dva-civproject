/**
 * Created by lyunfan on 17/6/6.
 */


(function (document, bizContainer, $) {

  window._global = window._global || {};

  if(!_global.isabled){
    return;
  }

  //初始化地图

  _global.bizContainer = bizContainer;

  //基本方法

  _global.locationPoint = function (x, y, title) {
    const data={XY:x+','+y,title:title};
    window.WebViewJavascriptBridge.callHandler(
      'GO_MOBILE_MAP'
      , data
      , function(responseData) {
       // alert(responseData);
      }
    );
    //if (!map) {
    //  return;
    //}
    ////alert(0);
    ////alert(typeof map);
    ////alert(JSON.stringify(map));
    ////if(map.mapgisGlobals){
    ////  alert(1);
    ////}
    ////if( map.mapgisGlobals.mapManager){
    ////  alert(2);
    ////}
    ////if( map.mapgisGlobals.mapManager.locateOn){
    ////  alert(3);
    ////}
    //
    //if (!_global.isMapShow()) {
    //  _global.showMap();
    //}
    //
    //
    //map.mapgisGlobals.mapManager.locateOn({
    //  x: x,
    //  y: y,
    //  title: title
    //});
  };


  //_global.isMapShow = function () {
  //  return $(mapContainer).hasClass('show');
  //};
  //_global.showMap = function () {
  //  $(mapContainer).removeClass('hide');
  //  $(mapContainer).addClass('show');
  //
  //  $(bizContainer).removeClass('show');
  //  $(bizContainer).addClass('hide');
  //};
  //
  //_global.hideMap = function () {
  //  $(mapContainer).removeClass('show');
  //  $(mapContainer).addClass('hide');
  //
  //  $(bizContainer).removeClass('hide');
  //  $(bizContainer).addClass('show');
  //
  //}


})(document, document.getElementById('bizContainer'), $);
