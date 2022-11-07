import React from 'react';
import { Maps } from './components/map';
import { ChartCard } from './components/chart-card';
import { createBackgroundByG, DefaultPathStyle } from 'src/utils/g-background';
import {
  renderWordCloud,
  renderSkills,
  renderRelation,
  renderRadar,
} from './charts';
import { Profile } from './components/profile';

import styles from './style.module.scss';

const sliderWidth = 300;

export const Home = () => {
  const containerRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const [backgrounds, setBackgrounds] = React.useState([]);
  const [titleBackgrounds, setTitleBackgrounds] = React.useState([]);

  const getBackgroundImage = async (h) => {
    const centerWith = containerRef.current.clientWidth - sliderWidth * 2;
    const { lineWidth } = DefaultPathStyle;
    const centerOffset = 80;
    const centerDy = 40;
    const res = await Promise.allSettled([
      // left
      createBackgroundByG({
        width: sliderWidth,
        height: h / 2,
      }),
      createBackgroundByG({
        width: sliderWidth,
        height: h / 2,
      }),
      // center
      createBackgroundByG({
        width: centerWith,
        height: h,
        corner: ['left-top', 'right-top', 'right-bottom', 'left-bottom'],
        pathStyle: {
          path: [
            ['M', lineWidth, lineWidth],
            ['L', lineWidth + centerOffset, lineWidth],
            ['L', lineWidth + centerOffset + centerDy, lineWidth + centerDy],
            [
              'L',
              centerWith - lineWidth - centerOffset - centerDy,
              lineWidth + centerDy,
            ],
            ['L', centerWith - lineWidth - centerOffset, lineWidth],
            ['L', centerWith - lineWidth, lineWidth],
            ['L', centerWith - lineWidth, h - lineWidth],
            ['L', centerWith - lineWidth - centerOffset, h - lineWidth],
            [
              'L',
              centerWith - lineWidth - centerOffset - centerDy,
              h - lineWidth - centerDy,
            ],
            [
              'L',
              lineWidth + centerOffset + centerDy,
              h - lineWidth - centerDy,
            ],
            ['L', lineWidth + centerOffset, h - lineWidth],
            ['L', lineWidth, h - lineWidth],
            ['Z'],
          ],
        },
      }),
      // right
      createBackgroundByG({
        width: sliderWidth,
        height: h / 3,
        corner: ['right-top', 'right-bottom'],
      }),
      createBackgroundByG({
        width: sliderWidth,
        height: h / 3,
        corner: ['right-top', 'right-bottom'],
      }),
      createBackgroundByG({
        width: sliderWidth,
        height: h / 3,
        corner: ['right-top', 'right-bottom'],
      }),
    ]);
    const cardTitleStyle = {
      width: sliderWidth - 24,
      height: 32,
      cornerOffset: 12,
      pathStyle: {
        lineWidth: 1,
        fill: 'l(0) 0:#1c55ec 0.5:#9ad7ed 1:rgba(255,255,255,0)',
        stroke: 'l(0) 0:#1c55ec 0.5:#9ad7ed 1:rgba(255,255,255,0)',
      },
    };
    const titleRes = await Promise.allSettled([
      // left
      createBackgroundByG({
        corner: ['left-top'],
        ...cardTitleStyle,
      }),
      // right
      createBackgroundByG({
        corner: ['right-top'],
        ...cardTitleStyle,
      }),
    ]);
    setBackgrounds(res.map((item) => item.value));
    setTitleBackgrounds(titleRes.map((item) => item.value));
  };

  React.useEffect(() => {
    if (containerRef.current) {
      const { clientHeight } = containerRef.current;
      setHeight(clientHeight);
      getBackgroundImage(clientHeight);
    }
  }, [containerRef]);

  return (
    <div className={styles.container} ref={containerRef}>
      {height && backgrounds.length > 0 && (
        <React.Fragment>
          <div className={styles.left} style={{ width: sliderWidth }}>
            <Profile
              title="个人介绍"
              cardImage={backgrounds[0]}
              titleImage={titleBackgrounds[0]}
              titleStyle={{
                marginTop: 6,
              }}
              cardStyle={{ height: height / 2 }}
            />
            <ChartCard
              title="自我评价"
              renderChart={renderRadar}
              cardImage={backgrounds[1]}
              titleImage={titleBackgrounds[0]}
              titleStyle={{
                marginTop: 6,
              }}
              cardStyle={{ height: height / 2 }}
            />
          </div>
          <div className={styles.center}>
            <Maps cardImage={backgrounds[2]} />
          </div>
          <div className={styles.right} style={{ width: sliderWidth }}>
            <ChartCard
              title="获得荣誉"
              renderChart={renderWordCloud}
              cardImage={backgrounds[3]}
              titleImage={titleBackgrounds[1]}
              cardStyle={{ height: height / 3 }}
            />
            <ChartCard
              title="个人技能"
              renderChart={renderSkills}
              cardImage={backgrounds[4]}
              titleImage={titleBackgrounds[1]}
              cardStyle={{ height: height / 3 }}
            />
            <ChartCard
              title="导师团队"
              renderChart={renderRelation}
              cardImage={backgrounds[5]}
              titleImage={titleBackgrounds[1]}
              cardStyle={{ height: height / 3 }}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
