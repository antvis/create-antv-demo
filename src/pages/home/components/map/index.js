import React from 'react';
import { Scene, LineLayer, PointLayer, CanvasLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { Card } from 'src/components/card';
import { mapData } from '../../mock-data';

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

  const initMap = () => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'dark',
        center: [100, 38],
        zoom: 4,
      }),
    });

    sceneRef.current = scene;

    const dotPoint = new PointLayer({ zIndex: 2 })
      .source(mapData, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape('circle')
      .color('#00FFFF')
      .animate(true)
      .size(30);
    scene.addLayer(dotPoint);

    const lineData = [];
    for (let i = 0; i < mapData.length - 1; i += 1) {
      lineData.push({
        lng1: mapData[i].lng,
        lat1: mapData[i].lat,
        lng2: mapData[i + 1].lng,
        lat2: mapData[i + 1].lat,
      });
    }

    const lineLayer = new LineLayer({ blend: 'normal' })
      .source(lineData, {
        parser: {
          type: 'json',
          x: 'lng1',
          y: 'lat1',
          x1: 'lng2',
          y1: 'lat2',
        },
      })
      .size(1.5)
      .shape('greatcircle')
      .animate({
        enable: true,
        interval: 2,
        trailLength: 1,
        duration: 5,
      })
      .color('#00FFFF')
      .style({
        opacity: 0.8,
      });
    scene.addLayer(lineLayer);

    const canvasLayer = new CanvasLayer({}).style({
      drawingOnCanvas: (option) => {
        const { size, ctx } = option;
        const [width, height] = size;

        ctx.clearRect(0, 0, width, height);
        // canvas 绘制

        ctx.font = '48px Microsoft YaHei';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        ctx.fillText('西天取经之路', width / 2, height - 80);
      },
    });
    scene.addLayer(canvasLayer);
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
