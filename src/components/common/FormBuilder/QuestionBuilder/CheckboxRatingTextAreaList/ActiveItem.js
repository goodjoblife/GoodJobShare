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
import Text from '../Text';

const ActiveItem = ({
  page,
  title,
  dataKey,
  defaultValue,
  onChange,
  onCancel,
  option: { value: optionValue },
  isElseOption,
  placeholder,
  ratingLabels,
  footnote,
}) => {
  const [defaultSubject, defaultRating, defaultText] = defaultValue || [
    isElseOption ? '' : optionValue,
    0,
    '',
  ];

  const [subject, setSubject] = useState(defaultSubject);
  const [rating, setRating] = useState(defaultRating);
  const [text, setText] = useState(defaultText);

  const onClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const onConfirm = useCallback(() => {
    if ((isElseOption && subject) || rating || text) {
      onChange([subject, rating, text]);
    } else {
      onClear();
    }
  }, [isElseOption, onChange, onClear, rating, subject, text]);

  return (
    <div className={cn(styles.root, commonStyles.warnableContainer)}>
      <div className={styles.container}>
        <div className={styles.cell}>
          <Option selected>{optionValue}</Option>
        </div>
        {isElseOption && (
          <Text
            className={styles.subject}
            page={page}
            title={title}
            dataKey={dataKey}
            defaultValue={defaultSubject}
            value={subject}
            onChange={setSubject}
            placeholder={placeholder}
          />
        )}
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
  dataKey: PropTypes.string.isRequired,
  defaultValue: withShape(PropTypes.array, {
    0: PropTypes.string,
    1: PropTypes.number,
    2: PropTypes.string,
  }),
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  isElseOption: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  option: OptionPropType.isRequired,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

export default ActiveItem;
