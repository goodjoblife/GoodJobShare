import PropTypes from 'prop-types';
import React from 'react';

import { buyStatus as buyStatusMap } from 'constants/payment';
import { fetchBoxPropType } from 'utils/fetchBox';

import Failure from './Failure';
import { paymentRecordToBuyStatus } from './helpers';
import InProgress from './InProgress';
import Success from './Success';

const PaymentResult = ({ paymentRecordBox, paymentRecordId }) => {
  const buyStatus = paymentRecordToBuyStatus(paymentRecordBox);

  const paymentRecordData = paymentRecordBox.data;
  const fetchingStatus = paymentRecordBox.status;

  if (buyStatus === buyStatusMap.successful) {
    const {
      subscription: { expiredAt },
    } = paymentRecordData;

    return <Success expiredAt={new Date(expiredAt)} />;
  }
  if (buyStatus === buyStatusMap.inProgress) {
    return (
      <InProgress
        paymentRecordId={paymentRecordId}
        fetchingStatus={fetchingStatus}
      />
    );
  }

  const { publicId } = paymentRecordData;

  return <Failure publicId={publicId} />;
};

PaymentResult.propTypes = {
  paymentRecordBox: fetchBoxPropType,
  paymentRecordId: PropTypes.string,
};

PaymentResult.defaultProps = {
  publicId: '',
  buyStatus: buyStatusMap.failed,
};

export default PaymentResult;
