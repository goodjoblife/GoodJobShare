import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';

const Options = ({
  selectedIndices,
  onSelectIndex,
  options,
  elseOptionIndex,
}) => {
  return (
    <div className={styles.container}>
      {options.map(({ label }, index) => {
        return (
          <div key={index} className={styles.cell}>
            <Option
              onClick={() => onSelectIndex(index)}
              selected={selectedIndices.includes(index)}
              isElse={index === elseOptionIndex}
            >
              {label}
            </Option>
          </div>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  selectedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectIndex: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionIndex: PropTypes.number,
};

export default Options;
