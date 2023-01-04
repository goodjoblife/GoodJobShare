import React from 'react';
import { useParams } from 'react-router-dom';

import usePayment from 'hooks/payment/usePayment';
import RoundCard from 'common/RoundCard';

import PaymentResult from './PaymentResult';
import styles from './BuyResultPage.module.css';

const BuyResultPage = () => {
  const { paymentRecordId } = useParams();
  const { paymentRecord } = usePayment();

  return (
    <div className={styles.container}>
      <RoundCard className={styles.card}>
        <PaymentResult
          paymentRecord={paymentRecord}
          paymentRecordId={paymentRecordId}
        />
      </RoundCard>
    </div>
  );
};

export default BuyResultPage;
