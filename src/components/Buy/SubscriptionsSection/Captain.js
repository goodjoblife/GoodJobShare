import React from 'react';
import { format } from 'date-fns';
import { Section, P, Link } from 'common/base';
import styles from './SubscriptionsSection.module.css';
import { formatCommaSeparatedNumber } from 'utils/stringUtil';

const Captain = ({ dataCount, endDateTime }) => (
  <Section className={styles.captain}>
    <P>
      解鎖範圍：全站 {formatCommaSeparatedNumber(dataCount || 0)}{' '}
      筆面試、薪資資料，及期間內新增的資料
    </P>
    <P>
      使用期間：現在 ~ {format(endDateTime || new Date(), 'yyyy-MM-dd hh:mm a')}
    </P>
    <P>
      進行付款即代表同意本站
      <Link to="/product-and-refund" target="_blank">
        商品及退款政策
      </Link>
    </P>
  </Section>
);

export default Captain;
