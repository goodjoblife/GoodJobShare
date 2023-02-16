import React from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';

import styles from './PaymentResult.module.css';
import WarningIcon from './warning.svg';

const Failure = ({ publicId }) => {
  return (
    <div className={styles.content}>
      <Heading className={styles.title}>交易失敗</Heading>
      <img className={styles.icon} src={WarningIcon} alt="failed" />
      <P Tag="p" className={styles.description}>
        {`若錯誤持續發生，請以訂單編號 ${publicId}`}
      </P>
      <P Tag="p" className={styles.description}>
        {`聯絡 findyourgoodjob@gmail.com`}
      </P>
    </div>
  );
};

Failure.propTypes = {
  publicId: PropTypes.string,
};

Failure.defaultProps = {
  publicId: '',
};

export default Failure;
