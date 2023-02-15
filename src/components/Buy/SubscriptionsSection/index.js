import React from 'react';
import PropTypes from 'prop-types';
import { Section } from 'common/base';
import SubscriptionPlanCollection from './SubscriptionPlanCollection';
import Captain from './Captain';

const SubscriptionsSection = ({
  plans,
  selectedId,
  setSelectedId,
  ...props
}) => {
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

SubscriptionsSection.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      skuId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      duration: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      }),
    }),
  ),
  selectedId: PropTypes.string,
  setSelectedId: PropTypes.func.isRequired,
};

export default SubscriptionsSection;
