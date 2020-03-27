import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Glike } from 'common/icons';

import styles from './Rating.module.css';
import TitleBlock from '../TitleBlock';

const range = n => {
  return [...Array(n).keys()];
};

const useHover = () => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const handleMouseOver = useCallback(e => {
    setHoveredValue(parseInt(e.currentTarget.dataset.value, 10));
  }, []);
  const handleMouseOut = useCallback(() => {
    setHoveredValue(null);
  }, []);
  return [hoveredValue, handleMouseOver, handleMouseOut];
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
  validator,
  maxRating,
}) => {
  const [hoveredValue, handleMouseOver, handleMouseOut] = useHover();
  return (
    <div>
      <TitleBlock
        page={page}
        title={title}
        description={description}
        required={required}
      />
      <div className={styles.flexContainer}>
        {range(maxRating).map(i => (
          <label
            key={i}
            data-value={i + 1}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <input
              className={styles.ratingInput}
              type="checkbox"
              name={dataKey}
              checked={hoveredValue ? i < hoveredValue : i < value}
              onChange={() => {
                onChange(i + 1);
                setTimeout(onConfirm, 300);
              }}
            />
            <Glike className={cn(styles.glikeContainer)} />
          </label>
        ))}
        <div
          className={styles.noteContainer}
          data-value={hoveredValue || value}
        >
          <span />
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  required: false,
};

export default Rating;
