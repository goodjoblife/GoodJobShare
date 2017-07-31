import React from 'react';
import PropTypes from 'prop-types';

import TextInput from 'common/form/TextInput';

import InputTitle from '../../common/InputTitle';

import styles from './WeekWorkTime.module.css';

const WeekWorkTime = ({ weekWorkTime, onChange }) => (
  <div>
    <div
      style={{
        marginBottom: '12px',
      }}
    >
      <InputTitle
        text="一週工時"
      />
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          marginRight: '75px',
          marginBottom: '5px',
        }}
      >
        <TextInput
          type="number"
          value={weekWorkTime}
          onChange={e => onChange(e.target.value)}
          placeholder="40.5"
          style={{
            width: '155px',
            display: 'inline-block',
            marginRight: '12px',
          }}
          max={168}
          min={0}
        />
        <p
          className="pS"
          style={{
            display: 'inline-block',
          }}
        >
          小時
        </p>
      </div>
      <div
        className={styles.dialog}
        style={{
          width: '330px',
          height: '67px',
          padding: '10px',
        }}
      >
        <p className={styles.exclamation}>！</p>
        <p className="pS">
          請您留下最近一週的「實際工作時數」（不含休息時間，如：午休）。我有疑問
        </p>
      </div>
    </div>
  </div>
);

WeekWorkTime.propTypes = {
  weekWorkTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
};

export default WeekWorkTime;
