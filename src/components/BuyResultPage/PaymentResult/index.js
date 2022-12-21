import React from 'react';
import PropTypes from 'prop-types';

import { buyStatus as buyStatusMap } from 'constants/payment';
import RoundCard from 'common/RoundCard';

import Success from './Success';
import Failure from './Failure';
import InProgress from './InProgress';
import styles from './PaymentResult.module.css';

const getContentComponent = buyStatus => {
  if (buyStatus === buyStatusMap.successful) {
    return Success;
  }
  if (buyStatus === buyStatusMap.inProgress) {
    return InProgress;
  }

  return Failure;
};

const PaymentResult = ({ publicId, buyStatus, expiredAt }) => {
  const Content = getContentComponent(buyStatus);

  return (
    <RoundCard className={styles.container}>
      <Content publicId={publicId} expiredAt={expiredAt} />
    </RoundCard>
  );
};

PaymentResult.propTypes = {
  publicId: PropTypes.string,
  buyStatus: PropTypes.oneOf(Object.values(buyStatusMap)),
  expiredAt: PropTypes.instanceOf(Date),
};

PaymentResult.defaultProps = {
  publicId: '',
  buyStatus: buyStatusMap.failed,
};

export default PaymentResult;
