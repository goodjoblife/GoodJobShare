import React from 'react';
import PropTypes from 'prop-types';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';

const SubmitArea = ({ onSubmit }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        marginBottom: '28px',
        alignItems: 'center',
      }}
    >
      <Checkbox />
      <p
        style={{
          color: '#3B3B3B',
        }}
      >
        我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。
      </p>
    </div>
    <div>
      <ButtonSubmit
        text="送出資料"
        onClick={onSubmit}
      />
    </div>
  </div>
);

SubmitArea.propTypes = {
  onSubmit: PropTypes.func,
};

export default SubmitArea;
