import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumb from './BreadCrumb';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  return (
    <div>
      <BreadCrumb pageType={pageType} pageName={pageName} tabType={tabType} />
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
