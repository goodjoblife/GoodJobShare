import React from 'react';
import PropTypes from 'prop-types';

import Checked from 'common/icons/Checked';
import Feedback from 'common/Feedback';

const ReportSuccessFeedback = ({ buttonClick }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="回報成功"
    buttonText="回到頁面"
    Icon={Checked}
  />
);

ReportSuccessFeedback.propTypes = {
  buttonClick: PropTypes.func,
};

export default ReportSuccessFeedback;
