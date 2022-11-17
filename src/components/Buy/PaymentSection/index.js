import React, { useCallback, useState } from 'react';
import { Section, Subheading, P } from 'common/base';
import Checkbox from 'common/form/Checkbox';
import Button from 'common/button/ButtonRect';
import Card from 'common/Card';
import useTappay from 'hooks/tappay/useTappay';
import { CardCCV, CardExpirationDate, CardNumber } from './TappayElement';
import styles from './PaymentSection.module.css';

const PaymentSection = ({ ...props }) => {
  const [isPrimary, setPrimary] = useState(false);
  const submit = useTappay({
    handlePrime: prime => {
      alert('get prime 成功，prime: ' + prime);
      alert('creditCard', { prime });
    },
  });
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      submit();
    },
    [submit],
  );

  return (
    <Section {...props}>
      <Subheading className={styles.title} size="l">
        填寫信用卡資料
      </Subheading>
      <Card className={styles.card}>
        <form onSubmit={onSubmit}>
          <P bold>
            卡號
            <CardNumber />
          </P>
          <P bold>
            卡片到期日
            <CardExpirationDate />
          </P>
          <P bold>
            安全碼
            <CardCCV />
          </P>
        </form>
        <P>
          <Checkbox
            label="設為主要付款方式"
            checked={isPrimary}
            value="primary"
            onChange={e => setPrimary(e.target.checked)}
          />
        </P>
        <P size="s">本站使用 TapPay 服務，皆以 2048 bits 進行加密</P>
        <P>
          <Button>付款</Button>
        </P>
      </Card>
    </Section>
  );
};

export default PaymentSection;
