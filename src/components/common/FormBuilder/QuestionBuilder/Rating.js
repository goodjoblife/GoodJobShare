import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Glike } from 'common/icons';

import styles from './Rating.module.css';

const range = n => {
  return [...Array(n).keys()];
};

const Rating = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  warning,
  maxRating,
}) => (
  <div>
    <div
      className={cn(styles.flexContainer, { [styles.hasWarning]: !!warning })}
    >
      <div className={styles.ratingWrapper}>
        {range(maxRating).map(i => (
          <label className={styles.ratingLabel} key={i}>
            <input
              className={styles.ratingInput}
              type="checkbox"
              name={dataKey}
              checked={i < value}
              onChange={() => {
                onChange(i + 1);
                setTimeout(onConfirm, 300);
              }}
            />
            <Glike className={cn(styles.glikeContainer)} />
          </label>
        ))}
      </div>
      <div className={styles.noteContainer}>
        <span className={styles.clickNote}>點擊做評分</span>
      </div>
    </div>
    <div className={styles.warning}>{warning}</div>
  </div>
);

Rating.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  maxRating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  required: false,
};

export default Rating;
