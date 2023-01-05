import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';
import { contains, head, prop } from 'ramda';
import { Section, Wrapper } from 'common/base';
import SubscriptionsSection from './SubscriptionsSection';
import PaymentSection from './PaymentSection';
import TitleSection from './TitleSection';
import styles from './Buy.module.css';

const plans = [
  {
    id: '2',
    name: '包月方案',
    price: 99,
    duration: { amount: 1, unit: 'month' },
  },
  {
    id: '3',
    name: '包季方案',
    price: 149,
    duration: { amount: 3, unit: 'month' },
  },
];

const sanitizeSkuId = skuId => {
  const skuIds = plans.map(prop('id'));
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
  const [selectedId, setSelectedId] = useState(sanitizeSkuId(query.sku_id));
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
        />
      </Wrapper>
    </Section>
  );
};

export default Buy;
