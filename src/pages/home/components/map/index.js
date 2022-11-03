import React from 'react';
import { Scene, CityBuildingLayer, LineLayer, PolygonLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { Card } from 'src/components/card';

export const Maps = ({ cardImage }) => {
  const sceneRef = React.useRef();
  const asyncFetch = (url) => {
    return new Promise((resolve) => {
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => resolve(data));
      } catch (err) {
        resolve([]);
      }
    });
  };

  const fetchData = React.useCallback(async () => {
    const fetchUrlList = [
      'https://gw.alipayobjects.com/os/rmsportal/ggFwDClGjjvpSMBIrcEx.json',
      'https://gw.alipayobjects.com/os/bmw-prod/67130c6c-7f49-4680-915c-54e69730861d.json',
      'https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json',
    ];
    const res = await Promise.allSettled(
      fetchUrlList.map((url) => asyncFetch(url)),
    );
    if (res.length) {
      initMap(res.map((item) => item.value));
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    return () => {
      sceneRef.current?.destroy();
    };
  }, [fetchData]);

  const initMap = (dataList) => {
    const [pointLayerData, PolygonLayerData, LineLayerData] = dataList;
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'amap://styles/2922a1f20fffb827a620c2c5e80f9f4b?isPublic=true',
        center: [120.145196, 30.239885],
        pitch: 45,
        zoom: 13.4,
      }),
    });
    sceneRef.current = scene;
    const pointLayer = new CityBuildingLayer();
    pointLayer
      .source(pointLayerData)
      .size('floor', [0, 500])
      .color('rgba(242,246,250,1.0)')
      .animate({
        enable: true,
      })
      .active({
        color: '#0ff',
        mix: 0.5,
      })
      .style({
        opacity: 0.7,
        baseColor: 'rgb(16, 16, 16)',
        windowColor: 'rgb(30, 60, 89)',
        brightColor: 'rgb(255, 176, 38)',
        sweep: {
          enable: true,
          sweepRadius: 2,
          sweepColor: '#1990FF',
          sweepSpeed: 0.5,
          sweepCenter: [120.145319, 30.238915],
        },
      });
    scene.addLayer(pointLayer);

    const { lakeBorderData, lakeData, landData } = PolygonLayerData;
    const lakeLayer = new PolygonLayer()
      .source(lakeData)
      .shape('fill')
      .color('#1E90FF')
      .style({
        opacity: 0.4,
        opacityLinear: {
          enable: true,
          dir: 'out', // in - out
        },
      });
    const landLayer = new PolygonLayer()
      .source(landData)
      .shape('fill')
      .color('#3CB371')
      .style({
        opacity: 0.4,
        opacityLinear: {
          enable: true,
          dir: 'in', // in - out
        },
      });

    const lakeBorderLayer = new PolygonLayer()
      .source(lakeBorderData)
      .shape('fill')
      .color('#ccc')
      .style({
        opacity: 0.5,
        opacityLinear: {
          enable: true,
          dir: 'in', // in - out
        },
      });

    scene.addLayer(lakeLayer);
    scene.addLayer(lakeBorderLayer);
    scene.addLayer(landLayer);

    const layer = new LineLayer({
      zIndex: 0,
      depth: true,
    })
      .source(LineLayerData)
      .size(1)
      .shape('line')
      .color('#1990FF')
      .animate({
        interval: 1, // 间隔
        duration: 2, // 持续时间，延时
        trailLength: 2, // 流线长度
      });
    scene.addLayer(layer);
  };

  return (
    <Card
      title="足迹"
      cardImage={cardImage}
      showTitle={false}
      childrenStyle={{
        padding: '36px 12px',
      }}
    >
      {/* <button onClick={onClick}> 全局交互 +1</button> */}
      <div id="map"></div>
    </Card>
  );
};
