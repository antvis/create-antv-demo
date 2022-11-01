import React from 'react';
import { Maps } from './components/map';
import { ChartCard } from './components/chart-card';
import {
  renderWordCloud,
  renderSkills,
  renderRelation,
  renderRadar,
  renderLiquid,
} from './charts';
import RightTop from 'src/assets/right-top.png';
import RightCenter from 'src/assets/right-center.png';
import RightBottom from 'src/assets/right-bottom.png';
import LeftImage from 'src/assets/left.png';
import LeftTitleImage from 'src/assets/card-title-left.png';

import styles from './style.module.scss';

export const Home = () => {
  const containerRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current?.clientHeight);
    }
  }, [containerRef]);

  return (
    <div className={styles.container} ref={containerRef}>
      {height && (
        <React.Fragment>
          <div className={styles.left}>
            <ChartCard
              title="复习进度"
              renderChart={renderLiquid}
              cardImage={LeftImage}
              titleImage={LeftTitleImage}
              titleStyle={{
                marginTop: 6,
              }}
              cardStyle={{ height: height / 2 }}
            />
            <ChartCard
              title="自我评价"
              renderChart={renderRadar}
              cardImage={LeftImage}
              titleImage={LeftTitleImage}
              titleStyle={{
                marginTop: 6,
              }}
              cardStyle={{ height: height / 2 }}
            />
          </div>
          <div className={styles.center}>
            <Maps />
          </div>
          <div className={styles.right}>
            <ChartCard
              title="兴趣爱好"
              renderChart={renderWordCloud}
              cardImage={RightTop}
              cardStyle={{ height: height / 3 }}
            />
            <ChartCard
              title="Personal Skills"
              renderChart={renderSkills}
              cardImage={RightCenter}
              cardStyle={{ height: height / 3 }}
            />
            <ChartCard
              title="人物关系"
              renderChart={renderRelation}
              cardImage={RightBottom}
              cardStyle={{ height: height / 3 }}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
