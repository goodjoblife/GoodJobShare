import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Glike } from 'common/icons';
import styles from './Rating.module.css';

const Rating = ({
  title,
  description,
  dataKey,
  required,
  validator,
  maxRating,
  hover,
  active,
  onClick,
}) => (
  <div className={styles.ratingContainer}>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      5. {title}
    </div>
    {[...Array(maxRating).keys()].map((_, i) => (
      <label className={styles.ratingLabel} key={i}>
        <input
          className={styles.ratingInput}
          type="radio"
          name={dataKey}
          value={i}
        />
        <Glike
          className={cn(styles.glikeContainer, {
            [styles.active]: i < 3,
          })}
        />
      </label>
    ))}
    <span className={styles.clickNote}>點擊做評分</span>
  </div>
);

Rating.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  required: false,
};

export default Rating;
