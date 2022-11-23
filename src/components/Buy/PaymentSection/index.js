import React, { useCallback, useState } from 'react';
import { Section, Subheading, P } from 'common/base';
import Checkbox from 'common/form/Checkbox';
import Button from 'common/button/ButtonRect';
import Card from 'common/Card';
import Label from 'common/form/Label';
import useTappay from 'hooks/tappay/useTappay';
import { CardCCV, CardExpirationDate, CardNumber } from './TappayElement';
import Row from './Row';
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
      <form onSubmit={onSubmit}>
        <Card className={styles.form}>
          <div className={styles.inputSection}>
            <Row>
              <Label className={styles.label} isRequired>
                卡號
              </Label>
              <CardNumber />
            </Row>
            <Row half>
              <Label className={styles.label} isRequired>
                到期日 (MM/YY)
              </Label>
              <CardExpirationDate />
            </Row>
            <Row half>
              <Label className={styles.label} isRequired>
                安全碼
              </Label>
              <CardCCV />
            </Row>
            <Row>
              <Checkbox
                label="設為主要付款方式"
                checked={isPrimary}
                value="primary"
                onChange={e => setPrimary(e.target.checked)}
                margin=""
              />
            </Row>
          </div>
          <div className={styles.submitSection}>
            <Row>
              <Button>付款</Button>
            </Row>
            <Row>
              <P className={styles.note} size="s">
                本站採用 TapPay 金流交易系統，資料傳輸以 SSL 2048bit
                加密技術保護
              </P>
            </Row>
          </div>
        </Card>
      </form>
    </Section>
  );
};

export default PaymentSection;
