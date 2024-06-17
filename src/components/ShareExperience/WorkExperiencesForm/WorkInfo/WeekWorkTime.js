import React from 'react';
import PropTypes from 'prop-types';

import TextInput from 'common/form/TextInput';
import Unit from 'common/form/Unit';
import { P } from 'common/base';

import InputTitle from '../../common/InputTitle';
import dialogStyles from '../../common/Dialog.module.css';

const WeekWorkTime = ({ weekWorkTime, onChange }) => (
  <div>
    <InputTitle text="一週工時" />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          marginRight: '75px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextInput
          type="number"
          value={weekWorkTime}
          onChange={e => onChange(e.target.value)}
          placeholder="40.5"
          style={{
            width: '155px',
          }}
          max={168}
          min={0}
        />
        <Unit>小時</Unit>
      </div>
      <div className={dialogStyles.dialog}>
        <span className={dialogStyles.exclamation}>！</span>
        <P size="s">
          請您留下最近一週的「實際工作時數」（不含休息時間，如：午休）。
        </P>
      </div>
    </div>
  </div>
);

WeekWorkTime.propTypes = {
  onChange: PropTypes.func,
  weekWorkTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default WeekWorkTime;
