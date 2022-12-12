import { WrapComponent } from '../wrap';
import styles from './style.module.scss';

export const Section = ({ text, backgroundColor }) => {
  return (
    <WrapComponent>
      <div className={styles.container} style={{ backgroundColor }}>
        {text}
      </div>
    </WrapComponent>
  );
};
