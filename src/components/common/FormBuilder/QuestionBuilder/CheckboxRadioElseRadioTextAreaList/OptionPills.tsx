import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import Scrollable from 'common/FormBuilder/Scrollable';

import { Option } from '../Checkbox';
import OptionPill from './OptionPill';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAnimatedSelectedOptionIndex = ({
  lastSelectedOptionIndex,
  onSelectOptionIndex,
}: {
  lastSelectedOptionIndex: number | null | undefined;
  onSelectOptionIndex: (index: number) => void;
}) => {
  const transitionDuration = 0.3;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    lastSelectedOptionIndex != null ? lastSelectedOptionIndex : null,
  );

  useEffect(() => {
    if (lastSelectedOptionIndex !== null) {
      setSelectedOptionIndex(null);
    }
  }, [lastSelectedOptionIndex]);

  const onConfirm = useCallback(
    (index: number) => {
      if (selectedOptionIndex !== null) return;

      setSelectedOptionIndex(index);
      setTimeout(() => {
        onSelectOptionIndex(index);
      }, transitionDuration * 1000);
    },
    [onSelectOptionIndex, selectedOptionIndex],
  );

  return [selectedOptionIndex, onConfirm, { transitionDuration }];
};

type Props = {
  elseOptionIndex?: number;
  lastSelectedOptionIndex?: number;
  onSelectOptionIndex: (index: number) => void;
  options: Option[];
  selectedOptionIndices: number[];
  warning?: string;
};

const Options = ({
  options,
  selectedOptionIndices,
  onSelectOptionIndex,
  elseOptionIndex,
  lastSelectedOptionIndex,
  warning,
}: Props): React.ReactElement => {
  const animResult = useAnimatedSelectedOptionIndex({
    lastSelectedOptionIndex,
    onSelectOptionIndex,
  });
  const selectedOptionIndex = animResult[0] as number | null;
  const setSelectedOptionIndex = animResult[1] as (index: number) => void;
  const { transitionDuration } = animResult[2] as {
    transitionDuration: number;
  };

  return (
    <div className={cn(styles.root, { [commonStyles.hasWarning]: !!warning })}>
      <Scrollable
        className={cn(styles.container, commonStyles.warnableContainer)}
      >
        {options.map(
          ({ label }, index): React.ReactElement => {
            const shouldHide =
              selectedOptionIndex !== null && index !== selectedOptionIndex;
            return (
              <div
                key={index}
                className={cn(styles.cell, { [styles.hidden]: shouldHide })}
                style={{ transitionDuration: `${transitionDuration}s` }}
              >
                <OptionPill
                  onClick={(): void => setSelectedOptionIndex(index)}
                  selected={
                    selectedOptionIndices.includes(index) ||
                    selectedOptionIndex === index
                  }
                  isElse={index === elseOptionIndex}
                >
                  {label}
                </OptionPill>
              </div>
            );
          },
        )}
      </Scrollable>
      <div className={commonStyles.warning}>{warning}</div>
    </div>
  );
};

export default Options;
