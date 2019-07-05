import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { toPairs, compose, map } from 'ramda';

import Heading from 'common/base/Heading';
import StaticHelmet from 'common/StaticHelmet';

import {
  tabTypeTranslation,
  generateTabURL,
} from '../../constants/companyJobTitle';

import BreadCrumb from './BreadCrumb';
import TabLinkGroup from './TabLinkGroup';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  const helmetTitle = `${pageName} ${tabTypeTranslation[tabType]}`;
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
      <StaticHelmet.CompanyAndJobTitle title={helmetTitle} />
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
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
