import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';
import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import BreadCrumb from 'common/BreadCrumb';
import { tabTypeTranslation, generateTabURL } from 'constants/companyJobTitle';
import { generateBreadCrumbData } from './utils';
import TabLinkGroup from 'common/TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';
import SubscribeNotificationButton from 'components/CompanyAndJobTitle/SubscribeNotificationButton';
import StatisticsCard from 'components/CompanyAndJobTitle/StatisticsCard';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
  boxSelector,
}) => {
  const tabLinkOptions = useMemo(
    () =>
      compose(
        map(([type, label]) => ({
          label,
          to: generateTabURL({
            pageType,
            pageName,
            tabType: type,
          }),
        })),
        toPairs,
      )(tabTypeTranslation),
    [pageType, pageName],
  );

  const box = useSelector(boxSelector || (state => null));
  console.log('box isSubscribed', box?.data?.isSubscribed);
  console.log('box data', box?.data);
  console.log('box selector', boxSelector);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <BreadCrumb
          data={generateBreadCrumbData({ pageType, pageName, tabType })}
        />
      </div>
      <div>
        <div className={styles.titleContainer}>
          <Heading className={styles.title}>{pageName}</Heading>
          <SubscribeNotificationButton
            hasSubscribed={box?.data?.isSubscribed}
            companyId={box?.data?.id}
          />
        </div>
        <StatisticsCard pageType={pageType} pageName={pageName} />
      </div>
      <TabLinkGroup
        options={tabLinkOptions}
        style={{
          marginBottom: '24px',
        }}
      />
      {children}
      <FanPageBlock className={styles.fanPageBlock} />
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  boxSelector: PropTypes.func,
  children: PropTypes.node,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default CompanyAndJobTitleWrapper;
