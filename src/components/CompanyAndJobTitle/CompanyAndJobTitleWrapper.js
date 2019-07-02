import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'common/base/Heading';
// import StaticHelmet from 'common/StaticHelmet';

// import { tabTypeTranslation } from '../../constants/companyJobTitle';

import BreadCrumb from './BreadCrumb';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  // TODO: StaticHelmet recursion problem
  // const helmetTitle = `${pageName} ${tabTypeTranslation[tabType]}`;
  return (
    <div>
      {/* <StaticHelmet.CompanyAndJobTitle title={helmetTitle} /> */}
      <BreadCrumb
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        style={{ marginBottom: '20px' }}
      />
      <Heading style={{ color: '#000000' }}>{pageName}</Heading>
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
