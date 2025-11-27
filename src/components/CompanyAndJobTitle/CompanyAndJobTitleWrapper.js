import React, { useMemo } from 'react';
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
import {
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import { Wrapper } from 'common/base';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
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

  const pageH1 = useMemo(() => {
    switch (tabType) {
      case TAB_TYPE.WORK_EXPERIENCE:
      case TAB_TYPE.INTERVIEW_EXPERIENCE:
      case TAB_TYPE.TIME_AND_SALARY:
        return `${pageName} ${TAB_TYPE_DETAIL_TRANSLATION[tabType]}`;
      default:
        return pageName;
    }
  }, [pageName, tabType]);

  return (
    <div>
      <Wrapper size="l">
        <div style={{ marginBottom: '20px' }}>
          <BreadCrumb
            data={generateBreadCrumbData({ pageType, pageName, tabType })}
          />
        </div>
        <div>
          <div className={styles.titleContainer}>
            <Heading className={styles.title}>{pageH1}</Heading>
            {pageType === PAGE_TYPE.COMPANY && (
              <SubscribeNotificationButton companyName={pageName} />
            )}
          </div>
          <StatisticsCard pageType={pageType} pageName={pageName} />
        </div>
        <TabLinkGroup
          options={tabLinkOptions}
          style={{
            marginBottom: '24px',
          }}
        />
      </Wrapper>
      <Wrapper size="l">{children}</Wrapper>
      <Wrapper size="l">
        <FanPageBlock className={styles.fanPageBlock} />
      </Wrapper>
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  children: PropTypes.node,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default CompanyAndJobTitleWrapper;
