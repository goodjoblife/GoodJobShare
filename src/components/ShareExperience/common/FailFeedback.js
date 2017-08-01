import React from 'react';
import PropTypes from 'prop-types';

import Feedback from './Feedback';

const FailFeedback = ({ buttonClick }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="Oops 有些錯誤發生"
    info="請查看你的網路連線再試一次，如果你還沒填寫完，請先別關閉瀏覽器！"
    buttonText="好，我知道了"
  />
);

FailFeedback.propTypes = {
  buttonClick: PropTypes.func,
};

export default FailFeedback;
