import React, { useState, useCallback, useEffect } from 'react';
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
  validateOrWarnItem,
}) => {
  const [defaultSubject, defaultRating, defaultText] = defaultValue || [
    isElseOption ? '' : optionValue,
    0,
    '',
  ];

  const [subject, setSubject] = useState(defaultSubject);
  const [rating, setRating] = useState(defaultRating);
  const [text, setText] = useState(defaultText);

  const [warning, setWarning] = useState(null);

  const onClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  useEffect(() => {
    setWarning(null);
  }, [subject, rating, text]);

  const onConfirm = useCallback(() => {
    const warning = validateOrWarnItem([subject, rating, text]);
    if (warning) {
      setWarning(warning);
      return;
    }
    if ((isElseOption && subject) || rating || text) {
      onChange([subject, rating, text]);
    } else {
      onClear();
    }
  }, [
    validateOrWarnItem,
    isElseOption,
    onChange,
    onClear,
    rating,
    subject,
    text,
  ]);

  placeholder =
    typeof placeholder === 'function'
      ? placeholder([subject, rating, text])
      : placeholder;

  return (
    <div
      className={cn(styles.root, commonStyles.warnableContainer, {
        [commonStyles.hasWarning]: !!warning,
      })}
    >
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
            placeholder={isElseOption ? placeholder : null}
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
          placeholder={!isElseOption ? placeholder : null}
          value={text}
          onChange={setText}
          footnote={footnote}
          warning={warning}
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
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  ratingLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  validateOrWarnItem: PropTypes.func.isRequired,
};

export default ActiveItem;
