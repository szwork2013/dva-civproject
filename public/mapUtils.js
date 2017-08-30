/**
 * Created by lyunfan on 17/6/6.
 */


(function (document, bizContainer, $) {

  window._global = window._global || {};

  if (!_global.isabled) {
    return;
  }


  const mapContainerHtml="<div id='mapContainer' class='show' style='overflow: hidden;'> </div>";

  $('body').append(mapContainerHtml);
  //document.getElementsByTagName('body')[0].appendChild(mapContainerHtml);
  const mapContainer=document.getElementById('mapContainer');
  if (!mapContainer) {
    return;
  }
  //初始化地图

  const mapSrc = _global.ipPort + '/Web4/mobile/index.html';
  const mapHtml = '<iframe src=' + mapSrc + ' scrolling="auto" id="frame_map" name="map" marginwidth="0" marginheight="0" frameborder="no" style="width: 100%; height: 100%;"></iframe>';
  //$(mapContainer).html(mapHtml);

  const mapIframe = $(mapContainer).find('iframe[name=map]');
  _global.mapIframe = mapIframe;
  _global.bizContainer = bizContainer;
  _global.mapContainer = mapContainer;

  //基本方法

  _global.locationPoint = function (x, y, title) {
    if (!map||!map.mapgisGlobals) {
      return;
    }

    if (!_global.isMapShow()) {
      _global.showMap();
    }


    map.mapgisGlobals.mapManager.locateOn({
      x: x,
      y: y,
      title: title
    });
  };


  _global.isMapShow = function () {
    return $(mapContainer).hasClass('show');
  };
  _global.showMap = function () {
    $(mapContainer).removeClass('hide');
    $(mapContainer).addClass('show');

    $(bizContainer).removeClass('show');
    $(bizContainer).addClass('hide');
  };

  _global.hideMap = function () {
    $(mapContainer).removeClass('show');
    $(mapContainer).addClass('hide');

    $(bizContainer).removeClass('hide');
    $(bizContainer).addClass('show');

  }


})(document, document.getElementById('bizContainer'), $);
