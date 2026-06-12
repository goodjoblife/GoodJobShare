import React from 'react';
import { useParams } from 'react-router-dom';

import RoundCard from 'common/RoundCard';
import { usePaymentRecord } from 'hooks/payment/usePayment';

import styles from './BuyResultPage.module.css';
import PaymentResult from './PaymentResult';

const BuyResultPage = () => {
  const { paymentRecordId } = useParams();
  const paymentRecordBox = usePaymentRecord();

  return (
    <div className={styles.container}>
      <RoundCard className={styles.card}>
        <PaymentResult
          paymentRecordBox={paymentRecordBox}
          paymentRecordId={paymentRecordId}
        />
      </RoundCard>
    </div>
  );
};

export default BuyResultPage;
