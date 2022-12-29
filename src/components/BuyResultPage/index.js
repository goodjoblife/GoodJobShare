import React from 'react';
import { useParams } from 'react-router-dom';

import PaymentResult from './PaymentResult';
import styles from './BuyResultPage.module.css';
import { paymentRecordStatusToBuyStatus } from './helpers';

const BuyResultPage = () => {
  const buyStatus = paymentRecordStatusToBuyStatus();
  const { paymentRecordId } = useParams();

  return (
    <div className={styles.container}>
      <PaymentResult
        buyStatus={buyStatus}
        publicId={paymentRecordId}
        expiredAt={new Date(2022, 11, 31)}
      />
    </div>
  );
};

export default BuyResultPage;
