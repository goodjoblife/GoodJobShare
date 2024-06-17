import React from 'react';
import PropTypes from 'prop-types';

import { buyStatus as buyStatusMap } from 'constants/payment';
import { fetchBoxPropType } from 'utils/fetchBox';

import { paymentRecordToBuyStatus } from './helpers';
import Success from './Success';
import Failure from './Failure';
import InProgress from './InProgress';

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
