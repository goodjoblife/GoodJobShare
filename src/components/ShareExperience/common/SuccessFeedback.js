import React from 'react';
import PropTypes from 'prop-types';

import Checked from 'common/icons/Checked';
import Feedback from './Feedback';

const SuccessFeedback = ({ buttonClick }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="上傳成功"
    buttonText="查看本篇"
    Icon={Checked}
  />
);

SuccessFeedback.propTypes = {
  buttonClick: PropTypes.func,
};

export default SuccessFeedback;
