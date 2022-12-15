import React, { useState } from 'react';
import { Section } from 'common/base';
import SubscriptionPlanCollection from './SubscriptionPlanCollection';
import Captain from './Captain';

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

const SubscriptionsSection = ({ ...props }) => {
  const [selectedId, setSelectedId] = useState(plans[0].id);
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
