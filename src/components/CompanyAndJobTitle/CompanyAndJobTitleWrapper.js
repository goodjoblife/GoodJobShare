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
import { isFetched } from 'utils/fetchBox';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
  boxSelector,
}) => {
  const box = useSelector(boxSelector);
  const { id: companyId, name: companyName } = box.data || {};
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
            companyName={companyName}
            companyId={companyId}
            isFetched={isFetched(box)}
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
