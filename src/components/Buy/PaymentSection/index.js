import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { equals, path, compose } from 'ramda';
import cn from 'classnames';

import { Section, Subheading, P } from 'common/base';
import Button from 'common/button/ButtonRect';
import Card from 'common/Card';
import Label from 'common/form/Label';
import Loading from 'common/Loader';

import { useIsLoggedIn } from 'hooks/auth';
import { useMyCurrentSubscription } from 'hooks/payment/usePayment';
import { fetchMyCurrentSubscription } from 'actions/payment';
import { isUnfetched, isFetched } from 'utils/fetchBox';

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

const TemplateSection = ({ title, children, center, ...props }) => {
  return (
    <Section {...props}>
      <Subheading className={styles.title} size="l">
        {title}
      </Subheading>
      <Card className={cn(styles.form, { [styles.center]: center })}>
        {children}
      </Card>
    </Section>
  );
};

const isSubscriptionStatusOK = compose(
  equals('OK'),
  path(['data', 'status']),
);

const PaymentSection = ({ skuId, ...props }) => {
  const isLoggedIn = useIsLoggedIn();
  const myCurrentSubscriptionBox = useMyCurrentSubscription();
  const dispatch = useDispatch();

  const needsFetching = isUnfetched(myCurrentSubscriptionBox);
  const isReady = isFetched(myCurrentSubscriptionBox);

  const history = useHistory();
  const goToMySubscription = useCallback(() => {
    history.push('/me/subscriptions');
  }, [history]);

  useEffect(() => {
    if (isLoggedIn && needsFetching) {
      dispatch(fetchMyCurrentSubscription());
    }
  }, [dispatch, isLoggedIn, needsFetching]);

  if (!isLoggedIn) {
    return (
      <TemplateSection title="填寫信用卡資料" {...props}>
        <LoginSection />
      </TemplateSection>
    );
  }

  if (!isReady) {
    return <Loading size="l" />;
  }

  if (isSubscriptionStatusOK(myCurrentSubscriptionBox)) {
    return (
      <TemplateSection
        title="你已經有目前方案，無需另外付費解鎖！"
        center
        {...props}
      >
        <Button type="submit" onClick={goToMySubscription}>
          前往我的方案
        </Button>
      </TemplateSection>
    );
  }

  return (
    <TemplateSection title="填寫信用卡資料" {...props}>
      <Form skuId={skuId} />
    </TemplateSection>
  );
};

PaymentSection.propTypes = {
  skuId: PropTypes.string,
};

export default PaymentSection;
