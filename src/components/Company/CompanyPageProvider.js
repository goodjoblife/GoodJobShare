import React from 'react';
import PropTypes from 'prop-types';

import { pageType } from '../../constants/companyJobTitle';

const CompanyPageProvider = ({
  children,
  match: {
    params: { companyName },
  },
  tabType,
}) => (
  <React.Fragment>
    {children({
      pageType: pageType.COMPANY,
      pageName: companyName,
      tabType,
    })}
  </React.Fragment>
);

CompanyPageProvider.propTypes = {
  chdilren: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyName: PropTypes.string,
    }),
  }),
  tabType: PropTypes.string,
};

export default CompanyPageProvider;
