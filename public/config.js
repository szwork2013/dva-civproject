(function() {
    window._config = {
        protocol: "", //服务协议
        ip: "192.168.12.6:8089", //服务ip
        prefix: "", //服务前缀
        apptype: "local", //启动方式，本地或网络 net/local
        client: "mobile", //客户端类型
        compatible: false, //是否兼容模式，如果使用了3.0业务系统功能则设置为true

        /*************本地配置,网络版不需要*************/
        appJS: "application/MobilePlatform", //系统界面
        showBannerMenu: false, //是否显示标题栏菜单 (对一二级菜单生效，三级菜单则默认使用标题栏菜单)
        crossdomains: [], //可跨域域名
        icon: "assets/images/favicon.ico", //网页标题图标
        title: "供水管网地理信息系统", //系统标题
        subtitle: "", //系统副标题
        logo: "assets/images/logo/mapgis.png", //系统图标
        bannerLogo: "assets/images/logo/mapgis-white.png",
        expiration: 43200, //token过期时间 ，单位：分钟
        pagesize: 20,
        mapsettings: {
            type: "2d",
            viewingMode: "global",
            proxyUrl: "",
            environment: {
                atmosphere: null,
                starsEnabled: true
            },
            constraints: {
                rotationEnabled: false,
                tilt: {
                    max: 179.5
                },
                collision: {
                    enabled: false
                }
            },
            viewpoint: {
                camera: {
                    position: {
                        x: 508676.2342145984,
                        y: 3318311.59758814,
                        z: 89233.20642086491,
                        spatialReference: {
                            wkid: 4491
                        }
                    },
                    heading: 0,
                    tilt: 0,
                    fov: 55
                },
                targetGeometry: {
                    xmin: 495455.853314,
                    ymin: 3517657.335,
                    xmax: 500744.31,
                    ymax: 3521600,
                    spatialReference: { wkid: 4491 }
                }
            },
            basemaps: [{
                id: "gswp",
                title: "常州地形",
                thumbnailUrl: "assets/images/thumbnail/thumbnail_1.jpg",
                baseLayers: [{
                    title: "常州地形",
                    icon: "",
                    layerType: "TileLayer",
                    url: "CityInterface/rest/services/MapServer.svc/gswp",
                    opacity: 1,
                    visible: true
                }]
            }, {
                id: "gsyx",
                title: "常州影像",
                thumbnailUrl: "assets/images/thumbnail/thumbnail_4.jpg",
                baseLayers: [{
                    title: "常州地形",
                    icon: "",
                    layerType: "TileLayer",
                    url: "CityInterface/rest/services/MapServer.svc/gsyx",
                    opacity: 1,
                    visible: true
                }]
            }],
            layers: [{
                title: "供水示范",
                icon: "",
                layerType: "MapImageLayer",
                url: "CityInterface/rest/services/MapServer.svc/gssf",
                opacity: 1,
                showLegend: true,
                visible: true,
                useProxy: false
            }]
        },
        uiwidgets: [{
                label: "缩放",
                url: "mapgis/widgets/Zoom",
                bottom: 179,
                right: 15
            },
            {
                label: "图层控制",
                url: "widgets/LayerControler/LayerControler",
                bottom: 141,
                right: 15
            },
            {
                label: "复位",
                url: "mapgis/widgets/Home",
                bottom: 103,
                right: 15
            },
            {
                label: "点击查询",
                url: "widgets/Identify/Identify",
                bottom: 65,
                right: 15
            },
            {
                label: "比例尺",
                url: "mapgis/widgets/ScaleBar",
                bottom: 80,
                left: 15
            },
            {
                label: "坐标",
                url: "widgets/Coordinates/Coordinates",
                bottom: 60,
                left: 15
            },
            {
                label: "底图切换",
                url: "widgets/BasemapGallery/BasemapGallery",
                top: 15,
                right: 5
            }
        ],
        widgets: [{
            label: "查询",
            icon: "assets/images/menu/webgis/查询.png",
            widgets: [{
                label: "点击查询",
                icon: "assets/images/menu/webgis/查询.png",
                url: "widgets/ClickQuery/ClickQuery"
            },
                {
                    label: "快速查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/QuicklyQuery/QuicklyQuery"
                },
                {
                    label: "按位置查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/LocationQuery/LocationQuery"
                },
                {
                    label: "条件查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/ConditionQuery/ConditionQuery"
                },
                {
                    label: "沿线查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/RouteQuery/RouteQuery"
                },
                {
                    label: "缓冲区查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/BufferQuery/BufferQuery"
                },
                {
                    label: "消火栓搜索",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/FirehydrantQuery/FirehydrantQuery"
                },
                {
                    label: "附属数据查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/AffiliatedQuery/AffiliatedQuery"
                }, {

                    label: "用户信息查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/UserInfoQuery/UserInfoQuery",
                    config: {
                        layerId: 3,
                        auxtablename: "WATERUSERINFO"
                    }
                },
                {
                    label: "用户水量查询",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/UserInfoQuery/UserInfoQuery",
                    config: {
                        layerId: 3,
                        auxtablename: "WATERUSERINFO",
                        keyfield: "用户号"
                    }
                },
                {
                    label: "用户挂接",
                    icon: "assets/images/menu/webgis/查询.png",
                    url: "widgets/BindUserToEquipQuery/BindUserToEquipQuery"
                }
            ]
        },
            {
                label: "统计",
                icon: "assets/images/menu/webgis/统计.png",
                widgets: [{
                    label: "按口径统计阀门1",
                    icon: "assets/images/menu/webgis/统计.png",
                    url: "/citywebfw/Product/Maintenance/baseVersion3.0/EventManage/views/EventListMainView|type=deal",
                    config: {
                        layername: "阀门",
                        groupfield: "口径",
                        outstatisticsfield: "口径",
                        outstatistictype: "count"
                    }
                },
                    {
                        label: "按口径统计阀门23",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/SpecialStatistics/SpecialStatistics",
                        config: {
                            layername: "阀门",
                            groupfield: "口径",
                            outstatisticsfield: "口径",
                            outstatistictype: "count"
                        }
                    },
                    {
                        label: "按管材统计管长",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/SpecialStatistics/SpecialStatistics",
                        config: {
                            layername: "管段",
                            groupfield: "管材",
                            outstatisticsfield: "管长",
                            outstatistictype: "sum"
                        }
                    },
                    {
                        label: "按管径统计管长",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/SpecialStatistics/SpecialStatistics",
                        config: {
                            layername: "管段",
                            groupfield: "管径",
                            outstatisticsfield: "管长",
                            outstatistictype: "sum"
                        }
                    },
                    {
                        label: "按道路统计设备",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/SpecialStatistics/SpecialStatistics",
                        config: {
                            layername: "阀门",
                            groupfield: "位置",
                            outstatisticsfield: "位置",
                            outstatistictype: "count"
                        }
                    },
                    {
                        label: "全设备汇总",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/AllEquipmentStatistics/AllEquipmentStatistics"
                    },
                    {
                        label: "管长统计",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/EquipmentStatistics/EquipmentStatistics",
                        config: {
                            statType: "sum"
                        }
                    },
                    {
                        label: "设备个数统计",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/EquipmentStatistics/EquipmentStatistics",
                        config: {
                            statType: "count"
                        }
                    },
                    {
                        label: "通用统计",
                        icon: "assets/images/menu/webgis/统计.png",
                        url: "widgets/CommonStatistics/CommonStatistics"
                    }
                ]
            },
            {
                label: "工具",
                icon: "assets/images/menu/webgis/工具.png",
                widgets: [{
                    label: "地图标记",
                    icon: "assets/images/menu/webgis/工具.png",
                    url: "widgets/Mark/Mark"
                },
                    {
                        label: "地图测量",
                        icon: "assets/images/menu/webgis/工具.png",
                        url: "widgets/MapMeasurement/MapMeasurement"
                    },
                    {
                        label: "打印TIFF",
                        icon: "assets/images/menu/webgis/工具.png",
                        url: "widgets/TIFF/TIFF"
                    },
                    {
                        label: "导出CAD",
                        icon: "assets/images/menu/webgis/工具.png",
                        url: "widgets/CAD/CAD"
                    },
                    {
                        label: "Web打印",
                        icon: "assets/images/menu/webgis/工具.png",
                        url: "widgets/ScreenshotPrint/ScreenshotPrint"
                    }
                ]
            },
            {
                label: "展示",
                icon: "assets/images/menu/webgis/展示.png",
                widgets: [{
                    label: "大口径阀门展示",
                    icon: "assets/images/menu/webgis/展示.png",
                    url: "widgets/FeatureDisplay/FeatureDisplay",
                    config: {
                        layername: "阀门",
                        queryWhere: "口径  >= 400"
                    }
                },
                    {
                        label: "大口径管段展示",
                        icon: "assets/images/menu/webgis/展示.png",
                        url: "widgets/FeatureDisplay/FeatureDisplay",
                        config: {
                            layername: "管段",
                            queryWhere: "管径  >= 400"
                        }
                    },
                    {
                        label: "消火栓分布",
                        icon: "assets/images/menu/webgis/展示.png",
                        url: "widgets/FeatureDisplay/FeatureDisplay",
                        config: {
                            layername: "消防栓"
                        }
                    },
                    {
                        label: "SCADA展示",
                        icon: "assets/images/menu/webgis/展示.png",
                        url: "widgets/ShowSCADA/ShowSCADA"
                    },
                    {
                        label: "事件展示",
                        icon: "assets/images/menu/webgis/展示.png",
                        url: "widgets/EventDisplay/EventDisplay"
                    }
                ]
            },
            {
                label: "分析",
                icon: "assets/images/menu/webgis/分析.png",
                widgets: [{
                    label: "爆管分析",
                    icon: "assets/images/menu/webgis/分析.png",
                    url: "widgets/SquibAnalysis/SquibAnalysis"
                },
                    {
                        label: "断面观察",
                        icon: "assets/images/menu/webgis/分析.png",
                        url: "widgets/Analysis_section/Analysis_section"
                    },
                    {
                        label: "连通性分析",
                        icon: "assets/images/menu/webgis/分析.png",
                        url: "widgets/Analysis_connectivity/Analysis_connectivity"
                    },
                    {
                        label: "区域连通性分析",
                        icon: "assets/images/menu/webgis/分析.png",
                        url: "widgets/Analysis_regionConnectivity/Analysis_regionConnectivity"
                    },
                    {
                        label: "老化设备检测",
                        icon: "assets/images/menu/webgis/分析.png",
                        url: "widgets/Analysis_test/Analysis_test"
                    }
                ]
            },
            {
                label: "纠错",
                icon: "assets/images/menu/webgis/纠错.png",
                widgets: [{
                    label: "错误属性上报",
                    icon: "assets/images/menu/webgis/纠错.png",
                    url: "widgets/ErroSendUp/ErroSendUp"
                },
                    {
                        label: "上报信息审核",
                        icon: "assets/images/menu/webgis/纠错.png",
                        url: "widgets/ErroAudit/ErroAudit"
                    },
                    {
                        label: "历史信息查询",
                        icon: "assets/images/menu/webgis/纠错.png",
                        url: "widgets/ErroHistory/ErroHistory"
                    }
                ]
            }
        ]
    }
})();