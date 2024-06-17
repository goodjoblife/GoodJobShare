import React from 'react';
import PropTypes from 'prop-types';

import { P } from 'common/base';
import { useTotalCount } from 'hooks/useCount';

import PlanCard from '../PlanPage/PlanCard';
import styles from './CurrentSubscription.module.css';

const CurrentSubscription = ({ subscriptionPlan, expiredAt }) => {
  const count = useTotalCount();

  const expiredDate = new Date(expiredAt);

  return (
    <div>
      <div className={styles.card}>
        <PlanCard
          title={subscriptionPlan.title}
          description={subscriptionPlan.description}
          amount={subscriptionPlan.amount}
          type={subscriptionPlan.type}
          hideCta={true}
        />
      </div>
      <P tag="p">{`解鎖範圍：全站 ${count} 筆面試、薪資資料，及期間內新增的資料`}</P>
      <P tag="p">{`使用期間：現在 ~ ${expiredDate.toLocaleString('zh-TW')}`}</P>
    </div>
  );
};

CurrentSubscription.propTypes = {
  expiredAt: PropTypes.string,
  subscriptionPlan: PropTypes.shape({
    amount: PropTypes.number,
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default CurrentSubscription;
