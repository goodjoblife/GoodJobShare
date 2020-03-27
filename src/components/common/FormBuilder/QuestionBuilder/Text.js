import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Text.module.css';

const Text = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  warning,
}) => {
  const [isComposing, setComposing] = useState(false);
  return (
    <div>
      <input
        className={cn(styles.textinput, { [styles.hasWarning]: !!warning })}
        type="text"
        placeholder="請輸入職業名稱"
        value={value}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={() => setComposing(false)}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (!isComposing && e.key === 'Enter') {
            e.target.blur();
            onConfirm();
          }
        }}
      />
      <div className={styles.warning}>{warning}</div>
    </div>
  );
};

Text.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
};

Text.defaultProps = {
  required: false,
};

export default Text;
