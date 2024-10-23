import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Glike from 'common/icons/Glike';

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
  ratingLabels,
}) => {
  const debouncedConfirm = useDebouncedConfirm(onConfirm, 300);
  const [hoveredValue, handleMouseOver, handleMouseOut] = useHover();
  return (
    <div className={cn({ [commonStyles.hasWarning]: !!warning })}>
      <div className={cn(styles.flexContainer, commonStyles.warnableContainer)}>
        {range(ratingLabels.length).map(i => {
          const handleChange = () => {
            onChange(i + 1);
            debouncedConfirm();
          };
          return (
            <label
              key={i}
              className={styles.ratingLabel}
              data-value={i + 1}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onFocus={handleMouseOver}
              onBlur={handleMouseOut}
              onKeyDown={e =>
                [' ', 'enter'].includes(e.key.toLowerCase()) && handleChange()
              }
              tabIndex="0"
            >
              <input
                className={styles.ratingInput}
                type="checkbox"
                name={dataKey}
                checked={hoveredValue ? i < hoveredValue : i < value}
                onChange={handleChange}
              />
              <Glike className={cn(styles.glikeContainer)} />
            </label>
          );
        })}
        <div
          className={styles.noteContainer}
          data-label={ratingLabels[(hoveredValue || value) - 1]}
        >
          <span />
        </div>
      </div>
      <div className={cn(commonStyles.warning, commonStyles.inlineWarning)}>
        {warning}
      </div>
    </div>
  );
};

Rating.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.number.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  page: PropTypes.number.isRequired,
  ratingLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.number.isRequired,
  warning: PropTypes.string,
};

Rating.defaultProps = {
  ratingLabels: [],
};

export default Rating;
