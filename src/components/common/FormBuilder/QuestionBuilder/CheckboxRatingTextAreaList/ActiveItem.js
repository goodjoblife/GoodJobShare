import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import cn from 'classnames';
import { OptionPropType } from '../Checkbox/PropTypes';
import Option from './Option';
import Rating from '../Rating';
import Textarea from '../TextArea';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import formStyles from '../../FormBuilder.module.css';
import { NavigatorButton } from 'common/FormBuilder/NavigatorBlock';

// item values = [rating, text]
const defaultItemValues = [0, ''];

const ActiveItem = ({
  page,
  title,
  dataKey,
  defaultValue,
  onChange,
  onCancel,
  option: { value: optionValue },
  ratingLabels,
  footnote,
}) => {
  const [, defaultRating, defaultText] = defaultValue || [
    optionValue,
    ...defaultItemValues,
  ];
  const [rating, setRating] = useState(defaultRating);
  const [text, setText] = useState(defaultText);

  const onClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const onConfirm = useCallback(() => {
    if (rating || text) {
      onChange([optionValue, rating, text]);
    } else {
      onClear();
    }
  }, [onChange, onClear, optionValue, rating, text]);

  return (
    <div className={cn(styles.root, commonStyles.warnableContainer)}>
      <div className={styles.container}>
        <div className={styles.cell}>
          <Option selected>{optionValue}</Option>
        </div>
        <Rating
          page={page}
          title={title}
          dataKey={dataKey}
          defaultValue={defaultRating}
          value={rating}
          onChange={setRating}
          ratingLabels={ratingLabels}
        />
        <Textarea
          className={styles.textarea}
          page={page}
          title={title}
          dataKey={dataKey}
          defaultValue={defaultText}
          value={text}
          onChange={setText}
          footnote={footnote}
        />
        <div
          className={cn(formStyles.navigationBar, styles.activeCtaButtonGroup)}
        >
          <NavigatorButton onClick={onClear}>清除</NavigatorButton>
          <NavigatorButton onClick={onCancel}>取消</NavigatorButton>
          <NavigatorButton onClick={onConfirm}>儲存</NavigatorButton>
        </div>
      </div>
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
    2: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  option: OptionPropType.isRequired,
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default ActiveItem;
