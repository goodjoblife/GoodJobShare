import React from 'react';
import PropTypes from 'prop-types';

import Feedback from 'common/Feedback';

const FacebookFail = ({ buttonClick }) => (
  <Feedback
    buttonClick={buttonClick}
    heading="Facebook 登入失敗"
    info="為了避免使用者大量輸入假資訊，我們會以您的 Facebook 帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。"
    buttonText="以 f 認證，送出資料"
  />
);

FacebookFail.propTypes = {
  buttonClick: PropTypes.func,
};

export default FacebookFail;
