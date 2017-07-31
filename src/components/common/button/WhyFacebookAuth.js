import React from 'react';
import PropTypes from 'prop-types';

import Question from 'common/icons/Question';
import Button from 'common/button/Button';

const WhyFacebookAuth = ({ buttonClick }) => (
  <div
    style={{
      padding: '55px',
      width: '470px',
    }}
  >
    <Question
      style={{
        fill: '#FCD406',
        height: '82px',
        width: '82px',
        marginBottom: '32px',
      }}
    />
    <h2
      style={{
        fontSize: '2rem',
        marginBottom: '19px',
      }}
    >
      為何需要 FB 帳戶驗證？
    </h2>
    <p
      style={{
        marginBottom: '30px',
      }}
    >
      為了避免使用者大量輸入假資訊，我們會以您的 Facebook 帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。
    </p>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        btnStyle="black"
        circleSize="md"
        onClick={buttonClick}
      >
        好，我知道了
      </Button>
    </div>
  </div>
);

WhyFacebookAuth.propTypes = {
  buttonClick: PropTypes.func,
};

export default WhyFacebookAuth;
