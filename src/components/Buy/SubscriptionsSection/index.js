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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      duration: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
    }),
  ),
  selectedId: PropTypes.string.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default SubscriptionsSection;
