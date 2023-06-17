import React from 'react';
import PropTypes from 'prop-types';

import Question from 'common/icons/Question';

import Feedback from 'common/Feedback';

const WhyFacebookAuth = ({ buttonClick }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="為何需要 FB/Google 帳戶驗證？"
    info="為了避免使用者大量輸入假資訊，我們會以您的 Facebook/Google 帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。"
    buttonText="好，我知道了"
    Icon={Question}
  />
);

WhyFacebookAuth.propTypes = {
  buttonClick: PropTypes.func,
};

export default WhyFacebookAuth;
