import React from 'react';
import PropTypes from 'prop-types';

import Checked from 'common/icons/Checked';
import Feedback from 'common/Feedback';

const SuccessFeedback = ({ buttonClick, info, buttonText }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="上傳成功"
    info={info}
    buttonText={buttonText || '查看本篇'}
    Icon={Checked}
  />
);

SuccessFeedback.propTypes = {
  buttonClick: PropTypes.func,
  buttonText: PropTypes.string,
  info: PropTypes.string,
};

export default SuccessFeedback;
