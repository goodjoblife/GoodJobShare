import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Section, Subheading, P } from 'common/base';
import Button from 'common/button/ButtonRect';
import Card from 'common/Card';
import Label from 'common/form/Label';
import { useIsLoggedIn } from 'hooks/auth';

import { CardCCV, CardExpirationDate, CardNumber } from './TappayElement';
import Row from './Row';
import CreditCards from './CreditCards';
import styles from './PaymentSection.module.css';
import useForm, { FORM_STATE } from './useForm';
import LoginSection from '../LoginSection';

const Form = ({ skuId }) => {
  const { activeCardType, formState, submit } = useForm({
    skuId,
  });
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      submit();
    },
    [submit],
  );

  const submitDisabed = formState !== FORM_STATE.NORMAL;

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.inputSection}>
        <Row>
          <Label className={styles.label} isRequired>
            卡號
          </Label>
          <div className={styles.cardNumberGroup}>
            <div className={styles.cardIcons}>
              <CreditCards activeCardType={activeCardType} />
            </div>
            <CardNumber />
          </div>
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
      </div>
      <div className={styles.submitSection}>
        <Row>
          <Button type="submit" disabled={submitDisabed}>
            付款
          </Button>
        </Row>
        <Row>
          <P className={styles.note} size="s">
            本站採用 TapPay 金流交易系統，資料傳輸以 SSL 2048bit 加密技術保護
          </P>
        </Row>
      </div>
    </form>
  );
};

const PaymentSection = ({ skuId, ...props }) => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Section {...props}>
      <Subheading className={styles.title} size="l">
        填寫信用卡資料
      </Subheading>
      <Card className={styles.form}>
        {isLoggedIn ? <Form skuId={skuId} /> : <LoginSection />}
      </Card>
    </Section>
  );
};

PaymentSection.propTypes = {
  skuId: PropTypes.string,
};

export default PaymentSection;
