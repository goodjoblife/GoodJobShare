import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { OptionPropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';

const Options = ({ onSelectIndex, options, elseOptionIndex }) => {
  return (
    <div className={styles.container}>
      {options.map(({ label }, index) => {
        return (
          <div key={index} className={styles.cell}>
            <Option
              onClick={() => onSelectIndex(index)}
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
  onSelectIndex: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionIndex: PropTypes.number,
};

export default Options;
