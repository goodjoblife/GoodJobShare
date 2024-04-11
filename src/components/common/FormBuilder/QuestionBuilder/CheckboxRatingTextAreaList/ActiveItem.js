import React from 'react';
import PropTypes from 'prop-types';
import { OptionPropType } from '../Checkbox/PropTypes';
import Option from './Option';
import styles from './styles.module.css';

const ActiveItem = ({ option: { value: optionValue }, onCancel }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cell}>
        <Option selected onClick={onCancel}>
          {optionValue}
        </Option>
      </div>
    </div>
  );
};

ActiveItem.propTypes = {
  option: OptionPropType.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ActiveItem;
