import React, { Fragment } from 'react';
import styles from './AppreciationContent.module.css';
import flowerImage from './flower.png';
import aboutPeopleImage from '../../../../images/about-people-colored.png'; // 是否要改成絕對路徑？

const AppreciationContent = () => {
  return (
    <Fragment>
      <div className={styles.appreciationTitle}>
        <img src={flowerImage} alt="flowerImage" className={styles.flower} />
        <div>感謝你的回饋，</div>
        <div>你的回饋是我們成長重要的動力！</div>
      </div>
      <img src={aboutPeopleImage} alt="aboutPeopleImage" />
    </Fragment>
  );
};

export default AppreciationContent;
