import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Option from './Option';
import { OptionPropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import Scrollable from 'common/FormBuilder/Scrollable';

const Options = ({
  selectedIndices,
  onSelectIndex,
  options,
  elseOptionIndex,
  warning,
}) => {
  return (
    <div className={cn(styles.root, { [commonStyles.hasWarning]: !!warning })}>
      <Scrollable
        className={cn(
          styles.container,
          styles.optionsContent,
          commonStyles.warnableContainer,
        )}
      >
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
      </Scrollable>
      <div className={commonStyles.warning}>{warning}</div>
    </div>
  );
};

Options.propTypes = {
  selectedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectIndex: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionIndex: PropTypes.number,
  warning: PropTypes.string,
};

export default Options;
