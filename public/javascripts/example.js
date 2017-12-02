(function () {
    require.config({
        paths: {
            echarts: '/javascripts'
        },
        packages: [
            {
                name: 'BMap',
                location: '/javascripts',
                main: 'main'
            }
        ]
    });

    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map',
        'echarts/chart/heatmap'
    ],
    function (echarts, BMapExtension) {
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });

        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 104.114129,
            y: 37.550339
        };

        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 5);
        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        /*map.setMapStyle({
            styleJson: [
                  {
                       "featureType": "water",
                       "elementType": "all",
                       "stylers": {
                            "color": "#044161"
                       }
                  },
                  {
                       "featureType": "land",
                       "elementType": "all",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#064f85"
                       }
                  },
                  {
                       "featureType": "railway",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                       }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "labels",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry",
                       "stylers": {
                            "color": "#004981"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#00508b"
                       }
                  },
                  {
                       "featureType": "poi",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "green",
                       "elementType": "all",
                       "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "subway",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "manmade",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "local",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "labels",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry.fill",
                       "stylers": {
                            "color": "#029fd4"
                       }
                  },
                  {
                       "featureType": "building",
                       "elementType": "all",
                       "stylers": {
                            "color": "#1a5787"
                       }
                  },
                  {
                       "featureType": "label",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  }
            ]
        });*/

var points = [[120.14322240845,30.236064370321]];
 option = {
            color: ['gold','aqua','lime'],
            title : {
                text: '模拟迁徙',
                subtext:'数据纯属虚构',
                x:'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function (v) {
                    return v[1].replace(':', ' > ');
                }
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['北京', '上海', '广州'],
                selectedMode: 'single',
                selected:{
                    '上海' : false,
                    '广州' : false
                },
                textStyle : {
                    color: '#fff'
                }
            },
            toolbox: {
                show : true,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataRange: {
                min : 0,
                max : 100,
                x: 'right',
                calculable : true,
                color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                textStyle:{
                    color:'#fff'
                }
            },
            series : [
                 {
                    name: '北京',
                    type: 'map',
                    mapType: 'none',
                    data:[],
                    heatmap: {
                        minAlpha: 0.1,
                        data: points
                    },
                    itemStyle: {
                        normal: {
                            borderColor:'rgba(100,149,237,0.6)',
                            borderWidth:0.5,
                            areaStyle: {
                                color: '#1b1b1b'
                            }
                        }
                    }
                  }
            ]
        };


        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.onresize;
        BMapExt.setOption(option);
    }
);
})();
