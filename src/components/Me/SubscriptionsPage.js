import React, { useEffect } from 'react';
import { format } from 'date-fns';
import SubscriptionWrapper from './SubscriptionWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySubscriptions } from 'actions/payment';
import { mySubscriptionsSelector } from 'selectors/payment';
import { isFetched, isFetching } from 'utils/fetchBox';
import Loader from 'common/Loader';
import Table from 'common/table/Table';
import subscriptionStatus from './subscriptionStatus';
import styles from './SubscriptionsPage.module.css';

const formatCreatedAt = value => format(new Date(value), 'yyyy/MM/dd');
const formatTitle = ({ subscriptionPlan: { title, description } }) =>
  `${title} - ${description}`;
const formatDuration = ({ startedAt, expiredAt }) => (
  <span>
    {`${format(new Date(startedAt), 'yyyy-MM-dd hh:mm a')} ~`}
    <br />
    {format(new Date(expiredAt), 'yyyy-MM-dd hh:mm a')}
  </span>
);
const formatAmount = value => `$${value}`;
const formatStatus = value => subscriptionStatus[value];

const Subscriptions = () => {
  const subscriptionsBox = useSelector(mySubscriptionsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMySubscriptions());
  }, [dispatch]);

  if (!subscriptionsBox) return null;

  if (isFetching(subscriptionsBox)) return <Loader />;

  if (!isFetched(subscriptionsBox)) return null;

  const { data } = subscriptionsBox;

  return (
    <Table className={styles.subscriptions} data={data} primaryKey="id">
      <Table.Column
        className={styles.m}
        title="日期"
        dataField="createdAt"
        dataFormatter={formatCreatedAt}
      />
      <Table.Column
        className={styles.m}
        title="訂單編號"
        dataField="paymentRecord.publicId"
      />
      <Table.Column className={styles.l} title="項目" dataField={formatTitle} />
      <Table.Column
        className={styles.l}
        title="有效期間"
        dataField={formatDuration}
      />
      <Table.Column
        className={styles.m}
        title="金額"
        dataField="paymentRecord.amount"
        dataFormatter={formatAmount}
      />
      <Table.Column
        className={styles.m}
        title="狀態"
        dataField="status"
        dataFormatter={formatStatus}
      />
    </Table>
  );
};

export default () => (
  <SubscriptionWrapper>
    <Subscriptions />
  </SubscriptionWrapper>
);
