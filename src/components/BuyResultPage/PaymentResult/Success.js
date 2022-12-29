import React from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';

import styles from './PaymentResult.module.css';

const Success = ({ expiredAt }) => {
  return (
    <div className={styles.content}>
      <Heading className={styles.title}>交易成功</Heading>
      <div className={styles.icon}></div>
      <P Tag="p" className={styles.description}>
        {`解鎖有效日期至 ${expiredAt}`}
      </P>
      <P Tag="p" className={styles.description}>
        {`將於3 秒後跳轉回原內容頁面`}
      </P>
      <Button btnStyle="gray" circleSize="md" className={styles.action}>
        馬上回原頁面
      </Button>
    </div>
  );
};

Success.propTypes = {
  expiredAt: PropTypes.instanceOf(Date),
};

export default Success;
