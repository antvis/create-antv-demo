import React from 'react';
import G6 from '@antv/g6';
import { Data } from './mock-data';
import styles from './style.module.scss';

export const Practice = () => {
  const chartRef = React.useRef();

  const renderChart = ({ container, width, height }) => {
    const graph = new G6.Graph({
      container,
      width,
      height,
    });

    graph.data(Data);
    graph.render();
  };

  React.useEffect(() => {
    let chart;
    if (chartRef.current) {
      const { clientWidth, clientHeight } = chartRef.current;
      chart = renderChart({
        container: chartRef.current,
        width: clientWidth,
        height: clientHeight,
      });
    }
    return () => {
      chart?.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <h5>随堂练习</h5>
      <div className={styles.chart} ref={chartRef} />
    </div>
  );
};
