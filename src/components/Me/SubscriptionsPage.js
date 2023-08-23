import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import SubscriptionWrapper from './SubscriptionWrapper';
import {
  getError,
  getFetched,
  getUnfetched,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';
import Loader from 'common/Loader';
import Table from 'common/table/Table';
import subscriptionStatus from './subscriptionStatus';
import styles from './SubscriptionsPage.module.css';
import { useToken } from 'hooks/auth';
import apis from '../../apis';

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
  const [mySubscriptions, setMySubscriptions] = useState(getUnfetched());
  const token = useToken();

  useEffect(() => {
    setMySubscriptions(toFetching(mySubscriptions));

    const fetcher = apis.payment.getMySubscriptions(token);

    fetcher()
      .then(subscriptions => {
        setMySubscriptions(getFetched(subscriptions));
      })
      .catch(error => {
        console.error(error);
        setMySubscriptions(getError(error));
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mySubscriptions) return null;

  if (isFetching(mySubscriptions)) return <Loader />;

  if (!isFetched(mySubscriptions)) return null;

  const { data } = mySubscriptions;

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
