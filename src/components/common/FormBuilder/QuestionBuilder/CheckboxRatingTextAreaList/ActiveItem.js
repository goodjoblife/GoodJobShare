import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { OptionPropType } from '../Checkbox/PropTypes';
import Option from './Option';
import Rating from '../Rating';
import styles from './styles.module.css';

// item values = [rating]
const defaultItemValues = [0];

const ActiveItem = ({
  page,
  title,
  dataKey,
  defaultValue,
  onChange,
  onCancel,
  option: { value: optionValue },
  ratingLabels,
}) => {
  const [, defaultRating] = defaultValue || [optionValue, ...defaultItemValues];
  const [rating, setRating] = useState(defaultRating);
  const [completed, setCompleted] = useState(false);

  const onRatingChange = useCallback(rating => {
    setRating(rating);
    setCompleted(true);
  }, []);

  useEffect(() => {
    if (completed) {
      onChange([optionValue, rating]);
    }
  }, [completed, onChange, optionValue, rating]);

  return (
    <div className={styles.container}>
      <div className={styles.cell}>
        <Option selected onClick={onCancel}>
          {optionValue}
        </Option>
      </div>
      <Rating
        page={page}
        title={title}
        dataKey={dataKey}
        defaultValue={defaultRating}
        value={rating}
        onChange={onRatingChange}
        ratingLabels={ratingLabels}
      />
    </div>
  );
};

ActiveItem.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  dataKey: PropTypes.string.isRequired,
  defaultValue: withShape(PropTypes.array, {
    0: PropTypes.string,
    1: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  option: OptionPropType.isRequired,
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ActiveItem;
