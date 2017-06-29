import React from 'react';
import PropTypes from 'prop-types';

import Checked from 'common/icons/Checked';
import Button from 'common/button/Button';

const SuccessFeedback = ({ buttonClick }) => (
  <div
    style={{
      padding: '55px',
      width: '470px',
    }}
  >
    <Checked
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
        marginBottom: '47px',
      }}
    >
      上傳成功
    </h2>
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
        查看本篇
      </Button>
    </div>
  </div>
);

SuccessFeedback.propTypes = {
  buttonClick: PropTypes.func,
};

export default SuccessFeedback;
