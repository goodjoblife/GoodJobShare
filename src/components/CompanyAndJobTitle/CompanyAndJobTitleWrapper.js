import React from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';

import BreadCrumb from './BreadCrumb';

const CompanyAndJobTitleWrapper = ({
  children,
  pageType,
  pageName,
  tabType,
}) => {
  return (
    <div>
      <BreadCrumb
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        style={{
          marginBottom: '20px',
        }}
      />
      <Heading style={{ color: '#000000' }}>{pageName}</Heading>
    </div>
  );
};

CompanyAndJobTitleWrapper.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
};
export default CompanyAndJobTitleWrapper;
