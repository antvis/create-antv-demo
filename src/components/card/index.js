import styles from './style.module.scss';
import TitleImage from '../../assets/card-title.png';

export const Card = ({
  title = '卡片',
  cardImage,
  titleImage = TitleImage,
  titleStyle,
  showTitle = true,
  children,
  style = {},
  childrenStyle = {},
}) => {
  return (
    <div
      className={styles.card}
      style={{
        background: cardImage ? `url(${cardImage}) no-repeat` : '',
        ...style,
      }}
    >
      {showTitle && (
        <h5
          style={{
            background: `url(${titleImage}) no-repeat 12px`,
            ...titleStyle,
          }}
        >
          {title}
        </h5>
      )}

      <div className={styles.children} style={childrenStyle}>
        {children}
      </div>
    </div>
  );
};
