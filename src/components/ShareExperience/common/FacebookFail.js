import React from 'react';
import PropTypes from 'prop-types';

import Warning from 'common/icons/Warning';
import Button from 'common/button/Button';

const FacebookFail = ({ buttonClick }) => (
  <div
    style={{
      padding: '55px',
      width: '470px',
    }}
  >
    <Warning
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
      Facebook 登入失敗
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
        以 f 認證，送出資料
      </Button>
    </div>
  </div>
);

FacebookFail.propTypes = {
  buttonClick: PropTypes.func,
};

export default FacebookFail;
