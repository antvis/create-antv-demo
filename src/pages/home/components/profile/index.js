import { Card } from 'src/components/card';
import Image from 'src/assets/h.png';
import styles from './style.module.scss';

export const Profile = ({
  title,
  cardImage,
  showTitle = true,
  titleImage,
  titleStyle,
  cardStyle = {},
}) => {
  const Group = ({ text, value }) => (
    <div className={styles.group}>
      <span>
        {text}：<b>{value}</b>
      </span>
    </div>
  );

  return (
    <Card
      title={title}
      cardImage={cardImage}
      showTitle={showTitle}
      titleImage={titleImage}
      titleStyle={titleStyle}
      style={cardStyle}
    >
      <div className={styles.profile}>
        <img src={Image} alt="" />
        <Group text="姓名" value="柯南" />
        <Group text="姓别" value="男" />
        <Group text="邮箱" value="xxx.email.com" />
      </div>
    </Card>
  );
};
