import React from 'react';
import PropTypes from 'prop-types';

import Feedback from 'common/Feedback';

const ApiErrorFeedback = ({ buttonClick, message }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="Oops 有些錯誤發生"
    info={message}
    buttonText="好，我知道了"
  />
);

ApiErrorFeedback.propTypes = {
  buttonClick: PropTypes.func,
  message: PropTypes.string,
};

export default ApiErrorFeedback;
