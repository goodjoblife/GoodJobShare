import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'react-redux';
import { Section, Subheading, P } from 'common/base';
import Checkbox from 'common/form/Checkbox';
import Button from 'common/button/ButtonRect';
import Card from 'common/Card';
import Label from 'common/form/Label';
import TapPayContext from 'common/tappay/TapPayContext';
import { CardCCV, CardExpirationDate, CardNumber } from './TappayElement';
import Row from './Row';
import CreditCards from './CreditCards';
import styles from './PaymentSection.module.css';
import useTapPay from './useTapPay';
import { checkoutSubscriptionWithPrime } from '../../../apis/payment';
import { tokenSelector } from '../../../selectors/authSelector';

const PaymentSection = ({ tapPayCard, loadTapPayCard, skuId, ...props }) => {
  const [isPrimary, setPrimary] = useState(false);
  const [activeCardType, setActiveCardType] = useState('unknown');
  const [canGetPrime, setCanGetPrime] = useState(false);

  const handleUpdate = useCallback(update => {
    setActiveCardType(update.cardType);
    setCanGetPrime(update.canGetPrime);
  }, []);

  const store = useStore();
  const token = tokenSelector(store.getState());

  const handlePrime = useCallback(
    async prime => {
      try {
        const paymentUrl = await checkoutSubscriptionWithPrime({
          token,
          prime,
          skuId,
          isPrimary,
        });
        window.location = paymentUrl;
      } catch (error) {
        // TODO: Error handling
        console.error(error);
      }
    },
    [isPrimary, skuId, token],
  );

  const submit = useTapPay({
    tapPayCard,
    loadTapPayCard,
    handleUpdate,
    handlePrime,
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
              <Button type="submit" disabled={!canGetPrime}>
                付款
              </Button>
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

PaymentSection.propTypes = {
  tapPayCard: PropTypes.object,
  loadTapPayCard: PropTypes.func.isRequired,
  skuId: PropTypes.string.isRequired,
};

export default ({ skuId }) => (
  <TapPayContext.Consumer>
    {({ loadTapPayCard, tapPayCard }) => (
      <PaymentSection
        loadTapPayCard={loadTapPayCard}
        tapPayCard={tapPayCard}
        skuId={skuId}
      />
    )}
  </TapPayContext.Consumer>
);
