import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';

import Heading from 'common/base/Heading';
import FanPageBlock from 'common/FanPageBlock';
import GoogleAdsense from 'common/GoogleAdsense';

import {
  tabTypeTranslation,
  generateTabURL,
} from '../../constants/companyJobTitle';

import BreadCrumb from './BreadCrumb';
import TabLinkGroup from './TabLinkGroup';
import styles from './CompanyAndJobTitleWrapper.module.css';

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
  return (
    <div>
      <BreadCrumb
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        style={{ marginBottom: '20px' }}
      />
      <Heading style={{ color: '#000000', marginBottom: '30px' }}>
        {pageName}
      </Heading>
      <TabLinkGroup
        options={tabLinkOptions}
        style={{
          marginBottom: '24px',
        }}
      />
      {children}
      <FanPageBlock className={styles.fanPageBlock} />
      <GoogleAdsense
        className={styles.adBeforeFanPageBlock}
        slot="2116582901"
        responsive="true"
      />
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
