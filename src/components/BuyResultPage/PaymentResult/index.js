import React from 'react';
import PropTypes from 'prop-types';

import { buyStatus as buyStatusMap } from 'constants/payment';
import { fetchBoxPropType } from 'utils/fetchBox';

import { paymentRecordStatusToBuyStatus } from './helpers';
import Success from './Success';
import Failure from './Failure';
import InProgress from './InProgress';

const PaymentResult = ({ paymentRecord, paymentRecordId }) => {
  const buyStatus = paymentRecordStatusToBuyStatus(paymentRecord);

  const paymentRecordData = paymentRecord.data;
  const fetchingStatus = paymentRecord.status;

  if (buyStatus === buyStatusMap.successful) {
    const { expiredAt } = paymentRecordData;

    return <Success expiredAt={expiredAt} />;
  }
  if (buyStatus === buyStatusMap.inProgress) {
    return (
      <InProgress
        paymentRecordId={paymentRecordId}
        fetchingStatus={fetchingStatus}
      />
    );
  }

  const publicId = paymentRecordData;

  return <Failure publicId={publicId} />;
};

PaymentResult.propTypes = {
  paymentRecordId: PropTypes.string,
  paymentRecord: fetchBoxPropType,
};

PaymentResult.defaultProps = {
  publicId: '',
  buyStatus: buyStatusMap.failed,
};

export default PaymentResult;
