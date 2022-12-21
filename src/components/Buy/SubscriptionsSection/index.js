import React, { useCallback, useMemo } from 'react';
import { Section } from 'common/base';
import SubscriptionPlanCollection from './SubscriptionPlanCollection';
import Captain from './Captain';
import { useHistory, useLocation } from 'react-router';
import qs from 'qs';
import { contains, head, prop } from 'ramda';

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

const SubscriptionsSection = ({ ...props }) => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const selectedId = sanitizeSkuId(query.sku_id);
  const history = useHistory();
  const setSelectedId = useCallback(
    selectedId => {
      history.push(
        qs.stringify(
          { ...query, sku_id: selectedId },
          { addQueryPrefix: true },
        ),
      );
    },
    [history, query],
  );
  return (
    <Section {...props}>
      <SubscriptionPlanCollection
        plans={plans}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Captain />
    </Section>
  );
};

export default SubscriptionsSection;
