import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

import variables from 'common/variables.module.css';

import P from 'common/base/P';

import styles from './ReportForm.module.css';

const getBorderStyle = invalid =>
  `1px solid ${invalid ? variables['warning-red'] : '#BDBDBD'}`;

const Reason = ({ invalid, reason, onChange }) => (
  <div
    style={{
      marginBottom: '10px',
    }}
  >
    <Textarea
      useCacheForDOMMeasurements
      value={reason}
      onChange={onChange}
      placeholder="請詳述檢舉原因"
      className={styles.textarea}
      style={{
        resize: 'none',
        width: '100%',
        color: '#333333',
        fontSize: '1rem',
        border: getBorderStyle(invalid),
        lineHeight: '1.5',
        minHeight: '88px',
        marginTop: '16px',
        marginBottom: '10px',
        padding: '12px 16px',
      }}
    />
    <P
      style={{
        color: variables['warning-red'],
        minHeight: '30px',
      }}
    >
      {
        invalid ? '請輸入500字以內的內容' : ''
      }
    </P>
  </div>
);

Reason.propTypes = {
  invalid: PropTypes.bool,
  reason: PropTypes.string,
  onChange: PropTypes.func,
};

export default Reason;
