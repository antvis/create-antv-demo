import React from 'react';
import { Card } from 'src/components/card';
import Image from 'src/assets/right-center.png';

export const ChartCard = ({
  renderChart,
  title,
  cardImage = Image,
  showTitle = true,
  titleImage,
  titleStyle,
  cardStyle = {},
}) => {
  const chartRef = React.useRef();

  React.useEffect(() => {
    let chart;
    if (typeof renderChart === 'function' && chartRef.current) {
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
  }, [renderChart]);

  return (
    <Card
      title={title}
      cardImage={cardImage}
      showTitle={showTitle}
      titleImage={titleImage}
      titleStyle={titleStyle}
      style={cardStyle}
    >
      <div ref={chartRef} />
    </Card>
  );
};
