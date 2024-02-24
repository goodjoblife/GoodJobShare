import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Section } from 'common/base';
import { useTotalCount } from 'hooks/useCount';
import { calcEndTime } from 'utils/dateUtil';

import SubscriptionPlanCollection from './SubscriptionPlanCollection';
import Captain from './Captain';

const SubscriptionsSection = ({
  plans,
  selectedId,
  setSelectedId,
  ...props
}) => {
  const dataCount = useTotalCount();
  const endDateTime = useMemo(() => {
    if (Array.isArray(plans) && selectedId !== undefined) {
      const currentPlan = plans.find(plan => plan.skuId === selectedId);
      if (currentPlan && currentPlan.duration) {
        const { type, amount } = currentPlan.duration;
        return calcEndTime(new Date(), type, amount);
      }
    }
    return new Date();
  }, [plans, selectedId]);

  return (
    <Section {...props}>
      <SubscriptionPlanCollection
        plans={plans}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Captain dataCount={dataCount} endDateTime={endDateTime} />
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
