import React from 'react';
import PropTypes from 'prop-types';

import RadioDefault from 'common/form/RadioDefault';

import styles from './ReasonCategory.module.css';

const ReasonCategory = ({
  reasonCategory,
  reasonCategoryOptions,
  handleReasonCategory,
}) => (
  <div>
    {reasonCategoryOptions.map(({ label, value }) => (
      <div key={value} className={styles.radio}>
        <RadioDefault
          label={label}
          value={value}
          name="reasonCategory"
          onChange={handleReasonCategory}
          checked={reasonCategory === value}
        />
      </div>
    ))}
  </div>
);

ReasonCategory.propTypes = {
  reasonCategory: PropTypes.string,
  reasonCategoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  handleReasonCategory: PropTypes.func,
};

export default ReasonCategory;
