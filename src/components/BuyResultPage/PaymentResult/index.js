import React from 'react';
import PropTypes from 'prop-types';

import { buyStatus as buyStatusMap } from 'constants/payment';

import { paymentRecordStatusToBuyStatus } from './helpers';
import Success from './Success';
import Failure from './Failure';
import InProgress from './InProgress';

const PaymentResult = ({ paymentRecord, redirectUrl, paymentRecordId }) => {
  const buyStatus = paymentRecordStatusToBuyStatus(paymentRecord);

  if (buyStatus === buyStatusMap.successful) {
    const expiredAt = paymentRecord;

    return <Success expiredAt={expiredAt} redirectUrl={redirectUrl} />;
  }
  if (buyStatus === buyStatusMap.inProgress) {
    return <InProgress paymentRecordId={paymentRecordId} />;
  }

  const { publicId } = paymentRecord;

  return <Failure publicId={publicId} />;
};

PaymentResult.propTypes = {
  paymentRecordId: PropTypes.string,
  paymentRecord: PropTypes.object,
  redirectUrl: PropTypes.string,
};

PaymentResult.defaultProps = {
  publicId: '',
  buyStatus: buyStatusMap.failed,
};

export default PaymentResult;
