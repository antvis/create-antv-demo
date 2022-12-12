import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Section } from './components/section';
import { ThemeColor10 } from 'src/constants';
import styles from './style.module.scss';

export const StoryTelling = () => {
  return (
    <div className={styles.container}>
      <ReactFullpage
        licenseKey={'YOUR_KEY_HERE'}
        scrollingSpeed={1000}
        credits={{ enabled: false, label: 'AntV' }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <Section text="section1" backgroundColor={ThemeColor10[0]} />
              <Section text="section2" backgroundColor={ThemeColor10[1]} />
              <Section text="section3" backgroundColor={ThemeColor10[2]} />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};
