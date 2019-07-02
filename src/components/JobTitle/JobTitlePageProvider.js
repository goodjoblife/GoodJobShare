import React from 'react';
import PropTypes from 'prop-types';

import { pageType } from '../../constants/companyJobTitle';

const JobTitlePageProvider = ({
  children,
  match: {
    params: { jobTitle },
  },
  tabType,
}) => (
  <React.Fragment>
    {children({
      pageType: pageType.JOB_TITLE,
      pageName: jobTitle,
      tabType,
    })}
  </React.Fragment>
);

JobTitlePageProvider.propTypes = {
  chdilren: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({
      jobTitle: PropTypes.string,
    }),
  }),
  tabType: PropTypes.string,
};

export default JobTitlePageProvider;
