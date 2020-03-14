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
    <div className={styles.title}>
      5. {title}
      <span className={styles.necessary}> * </span>
    </div>
    {[...Array(maxRating).keys()].map((_, i) => (
      <label className={styles.ratingLabel}>
        <input
          className={styles.ratingInput}
          key={i}
          type="radio"
          name={dataKey}
          value={i}
        />
        <Glike
          className={cn(styles.glickContainer, {
            [styles.hover]: hover,
            [styles.active]: active,
          })}
          onClick={onClick}
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
