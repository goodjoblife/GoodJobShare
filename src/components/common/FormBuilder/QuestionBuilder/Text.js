import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Text.module.css';
import TitleBlock from '../TitleBlock';

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
}) => (
  <div>
    <TitleBlock
      page={page}
      title={title}
      description={description}
      required={required}
    />
    <input
      className={cn(styles.textinput, { [styles.hasWarning]: !!warning })}
      type="text"
      placeholder="請輸入職業名稱"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.target.blur();
          onConfirm();
        }
      }}
    />
    <div className={styles.warning}>{warning}</div>
  </div>
);

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
