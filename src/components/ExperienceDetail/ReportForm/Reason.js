import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

import styles from './ReportForm.module.css';

const getBorderStyle = invalid =>
  `1px solid ${invalid ? '#d50000' : '#BDBDBD'}`;


const Reason = ({ invalid, reason, onChange }) => (
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
      marginTop: '17px',
      marginBottom: '10px',
      padding: '14px 18px',
    }}
  />
);

Reason.propTypes = {
  invalid: PropTypes.bool,
  reason: PropTypes.string,
  onChange: PropTypes.func,
};

export default Reason;
