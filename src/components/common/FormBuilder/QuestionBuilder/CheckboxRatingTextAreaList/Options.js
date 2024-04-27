import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Option from './Option';
import { OptionPropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import Scrollable from 'common/FormBuilder/Scrollable';

const Options = ({
  options,
  selectedOptionIndices,
  onSelectOptionIndex,
  elseOptionIndex,
  warning,
}) => {
  const transitionDuration = 0.3;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const onConfirm = useCallback(
    index => {
      if (selectedOptionIndex !== null) return;

      setSelectedOptionIndex(index);
      setTimeout(() => {
        onSelectOptionIndex(index);
      }, transitionDuration * 1000);
    },
    [onSelectOptionIndex, selectedOptionIndex],
  );

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
          const shouldHide =
            selectedOptionIndex !== null && index !== selectedOptionIndex;
          return (
            <div
              key={index}
              className={cn(styles.cell, { [styles.hidden]: shouldHide })}
              style={{ transitionDuration: `${transitionDuration}s` }}
            >
              <Option
                onClick={() => onConfirm(index)}
                selected={
                  selectedOptionIndices.includes(index) ||
                  selectedOptionIndex === index
                }
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
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  selectedOptionIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelectOptionIndex: PropTypes.func.isRequired,
  elseOptionIndex: PropTypes.number,
  warning: PropTypes.string,
};

export default Options;
