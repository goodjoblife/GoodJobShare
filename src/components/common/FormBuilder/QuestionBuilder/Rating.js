import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Glike } from 'common/icons';

import useDebouncedConfirm from '../useDebouncedConfirm';
import styles from './Rating.module.css';
import commonStyles from './styles.module.css';

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
  defaultValue,
  value,
  onChange,
  onConfirm,
  warning,
  validator,
  ratingLabels,
}) => {
  const debouncedConfirm = useDebouncedConfirm(onConfirm, 300);
  const [hoveredValue, handleMouseOver, handleMouseOut] = useHover();
  return (
    <div
      className={cn(
        styles.container,
        { [commonStyles.hasWarning]: !!warning },
        commonStyles.container,
      )}
    >
      <div className={cn(styles.flexContainer, commonStyles.flexContainer)}>
        {range(ratingLabels.length).map(i => (
          <label
            key={i}
            className={styles.ratingLabel}
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
                debouncedConfirm();
              }}
            />
            <Glike className={cn(styles.glikeContainer)} />
          </label>
        ))}
        <div
          className={styles.noteContainer}
          data-label={ratingLabels[(hoveredValue || value) - 1]}
        >
          <span />
        </div>
      </div>
      <div className={commonStyles.warning}>{warning}</div>
    </div>
  );
};

Rating.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  ratingLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

Rating.defaultProps = {
  ratingLabels: [],
};

export default Rating;
