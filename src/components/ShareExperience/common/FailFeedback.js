import React from 'react';
import PropTypes from 'prop-types';

import Warning from 'common/icons/Warning';
import Button from 'common/button/Button';

const FailFeedback = ({ buttonClick }) => (
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
      Oops 有些錯誤發生
    </h2>
    <p
      style={{
        marginBottom: '30px',
      }}
    >
      請查看你的網路連線再試一次，如果你還沒填寫完，請先別關閉瀏覽器！
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

FailFeedback.propTypes = {
  buttonClick: PropTypes.func,
};

export default FailFeedback;
