import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { toPairs, compose, map } from 'ramda';
import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import BreadCrumb from 'common/BreadCrumb';
import { tabTypeTranslation, generateTabURL } from 'constants/companyJobTitle';
import { companyOverviewBoxSelectorByName } from 'selectors/companyAndJobTitle';
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
  // const [isSubscribed, setIsSubscribed] = useState(false);
  // const overviewBoxSelector = useMemo(
  //   () => companyOverviewBoxSelectorByName(pageName),
  //   [pageName],
  // );

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

  // useEffect(() => {
  //   // if (box) {
  //   setIsSubscribed(true);
  //   // }
  // }, []);

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
