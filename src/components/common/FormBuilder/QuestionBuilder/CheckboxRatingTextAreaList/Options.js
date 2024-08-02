import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Option from './Option';
import { OptionPropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import Scrollable from 'common/FormBuilder/Scrollable';

const useAnimatedSelectedOptionIndex = ({
  lastSelectedOptionIndex,
  onSelectOptionIndex,
}) => {
  const transitionDuration = 0.3;

  // Temporary state to animate the options.
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    lastSelectedOptionIndex,
  );

  // Reset the selected index for non-null last selected index
  // to animate the options from the selected state.
  useEffect(() => {
    if (lastSelectedOptionIndex !== null) {
      setSelectedOptionIndex(null);
    }
  }, [lastSelectedOptionIndex]);

  const onConfirm = useCallback(
    index => {
      if (selectedOptionIndex !== null) return;

      // Set the selected index to animate the options.
      setSelectedOptionIndex(index);
      setTimeout(() => {
        onSelectOptionIndex(index);
      }, transitionDuration * 1000);
    },
    [onSelectOptionIndex, selectedOptionIndex],
  );

  return [selectedOptionIndex, onConfirm, { transitionDuration }];
};

const Options = ({
  options,
  selectedOptionIndices,
  onSelectOptionIndex,
  elseOptionIndex,
  lastSelectedOptionIndex,
  warning,
}) => {
  const [
    selectedOptionIndex,
    setSelectedOptionIndex,
    { transitionDuration },
  ] = useAnimatedSelectedOptionIndex({
    lastSelectedOptionIndex,
    onSelectOptionIndex,
  });

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
                onClick={() => setSelectedOptionIndex(index)}
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
  elseOptionIndex: PropTypes.number,
  lastSelectedOptionIndex: PropTypes.number,
  onSelectOptionIndex: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  selectedOptionIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  warning: PropTypes.string,
};

export default Options;
