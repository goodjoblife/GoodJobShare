import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'ramda';

const JobTitlePageProvider = ({ children }) => {
  return (
    <div>
      {children({
        pageType: 'jobTitle',
        pageName: 'honestbee',
        tabName: 'overview',
      })}
    </div>
  );
};

export default compose(withRouter)(JobTitlePageProvider);
