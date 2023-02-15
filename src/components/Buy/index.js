import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { contains, head, prop } from 'ramda';
import { Section, Wrapper } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';
import PaymentSection from './PaymentSection';
import TitleSection from './TitleSection';
import styles from './Buy.module.css';
import { useSubscriptionPlans } from 'hooks/payment/usePayment';
import { isFetched } from 'utils/fetchBox';
import Loading from 'common/Loader';
import { subscriptionType } from 'constants/subscription';
import { fetchSubscriptionPlans } from 'actions/payment';

const sanitizeSkuId = plans => skuId => {
  const skuIds = plans.map(prop('skuId'));
  if (contains(skuId, skuIds)) {
    return skuId;
  }
  return head(skuIds);
};

const Buy = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const plansBox = useSubscriptionPlans();
  const ready = isFetched(plansBox);
  const plans = useMemo(() => {
    if (!ready) {
      return [];
    }
    return plansBox.data.filter(
      d => d.type === subscriptionType.buySubscription,
    );
  }, [plansBox.data, ready]);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ready) {
      setSelectedId(sanitizeSkuId(plans)(query.sku_id));
    }
  }, [plans, query.sku_id, ready]);

  useEffect(() => {
    if (!ready) {
      dispatch(fetchSubscriptionPlans());
    }
  }, [dispatch, ready]);

  if (!ready) {
    return <Loading size="l" />;
  }

  return (
    <Section>
      <Wrapper size="s">
        <TitleSection paddingTop />
        <SubscriptionsSection
          paddingTop
          paddingBottom
          plans={plans}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <PaymentSection
          className={styles.topDivider}
          paddingTop
          paddingBottom
          skuId={selectedId}
        />
      </Wrapper>
    </Section>
  );
};

export default Buy;
