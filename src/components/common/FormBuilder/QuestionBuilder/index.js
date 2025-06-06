import React from 'react';
import {
  string,
  any,
  bool,
  number,
  func,
  oneOf,
  oneOfType,
  arrayOf,
  node,
} from 'prop-types';
import cn from 'classnames';
import { values } from 'ramda';

import Text from './Text';
import TextArea from './TextArea';
import {
  Radio,
  RadioElse,
  RadioElseRadio,
  RadioElseDate,
  Checkbox,
  CheckboxElse,
} from './Checkbox';
import Rating from './Rating';
import File from './File';
import Date from './Date';
import SelectText from './SelectText';
import TextList from './TextList';
import CheckboxRatingTextAreaList from './CheckboxRatingTextAreaList';

import TitleBlock from '../TitleBlock';
import Scrollable from '../Scrollable';
import styles from './styles.module.css';
import { OptionPropType } from './Checkbox/PropTypes';
import { normalizeOptions } from './utils';

export const QUESTION_TYPE = {
  TEXT: 'TEXT',
  TEXTAREA: 'TEXTAREA',
  RADIO: 'RADIO',
  RADIO_ELSE: 'RADIO_ELSE',
  RADIO_ELSE_RADIO: 'RADIO_ELSE_RADIO',
  RADIO_ELSE_DATE: 'RADIO_ELSE_DATE',
  RADIO_RATING_TEXTAREA_LIST: 'RADIO_RATING_TEXTAREA_LIST',
  CHECKBOX: 'CHECKBOX',
  CHECKBOX_ELSE: 'CHECKBOX_ELSE',
  RATING: 'RATING',
  FILE: 'FILE',
  DATE: 'DATE',
  SELECT_TEXT: 'SELECT_TEXT',
  TEXT_LIST: 'TEXT_LIST',
  EMPTY: 'EMPTY',
};

const useQuestionNode = ({
  page,
  title,
  description,
  type,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  onSelect,
  search,
  warning,
  setShowsNavigation,
  validateOrWarnItem,
  hint,
  placeholder,
  suffix,
  footnote,
  options,
  elseOptionValue,
  elseOptions,
  hasRating,
  ratingLabels,
}) => {
  const commonProps = {
    page,
    title,
    description,
    type,
    dataKey,
    required,
    defaultValue,
    value,
    onChange,
    onConfirm,
    warning,
    setShowsNavigation,
  };

  if (options) options = normalizeOptions(options);

  switch (type) {
    case QUESTION_TYPE.TEXT:
      return (
        <Text
          {...commonProps}
          placeholder={placeholder}
          onSelect={onSelect}
          search={search}
          footnote={footnote}
        />
      );
    case QUESTION_TYPE.TEXTAREA:
      return <TextArea {...commonProps} footnote={footnote} />;
    case QUESTION_TYPE.RADIO:
      return <Radio {...commonProps} options={options} />;
    case QUESTION_TYPE.RADIO_ELSE:
      return (
        <RadioElse
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          placeholder={placeholder}
        />
      );

    case QUESTION_TYPE.RADIO_ELSE_RADIO:
      return (
        <RadioElseRadio
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          elseOptions={elseOptions}
        />
      );
    case QUESTION_TYPE.RADIO_ELSE_DATE:
      return (
        <RadioElseDate
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
        />
      );
    case QUESTION_TYPE.RADIO_RATING_TEXTAREA_LIST:
      return (
        <CheckboxRatingTextAreaList
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          placeholder={placeholder}
          hasRating={hasRating}
          ratingLabels={ratingLabels}
          footnote={footnote}
          validateOrWarnItem={validateOrWarnItem}
        />
      );
    case QUESTION_TYPE.CHECKBOX:
      return <Checkbox {...commonProps} options={options} />;
    case QUESTION_TYPE.CHECKBOX_ELSE:
      return (
        <CheckboxElse
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          placeholder={placeholder}
        />
      );
    case QUESTION_TYPE.RATING:
      return <Rating {...commonProps} ratingLabels={ratingLabels} />;
    case QUESTION_TYPE.FILE:
      return <File {...commonProps} />;
    case QUESTION_TYPE.DATE:
      return <Date {...commonProps} />;
    case QUESTION_TYPE.SELECT_TEXT:
      return (
        <SelectText
          {...commonProps}
          placeholder={placeholder}
          hint={hint}
          options={options}
          suffix={suffix}
          footnote={footnote}
        />
      );
    case QUESTION_TYPE.TEXT_LIST:
      return <TextList {...commonProps} placeholder={placeholder} />;
    case QUESTION_TYPE.EMPTY:
      return null;
    default:
      // Should not happen
      return null;
  }
};

const useFillMode = ({ type }) => {
  switch (type) {
    case QUESTION_TYPE.TEXTAREA:
    case QUESTION_TYPE.RADIO:
    case QUESTION_TYPE.RADIO_ELSE:
    case QUESTION_TYPE.RADIO_ELSE_RADIO:
    case QUESTION_TYPE.RADIO_ELSE_DATE:
    case QUESTION_TYPE.RADIO_RATING_TEXTAREA_LIST:
    case QUESTION_TYPE.CHECKBOX:
    case QUESTION_TYPE.CHECKBOX_ELSE:
    case QUESTION_TYPE.TEXT_LIST:
      return true;
    default:
      return false;
  }
};

const QuestionBuilder = ({
  page,
  title,
  description,
  type,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  onSelect,
  search,
  warning,
  setShowsNavigation,
  validateOrWarnItem,
  hint,
  placeholder,
  suffix,
  footnote,
  options,
  elseOptionValue,
  elseOptions,
  hasRating,
  ratingLabels,
}) => {
  const shouldFillPage = useFillMode({ type });
  const questionNode = useQuestionNode({
    page,
    title,
    description,
    type,
    dataKey,
    required,
    defaultValue,
    value,
    onChange,
    onConfirm,
    onSelect,
    search,
    warning,
    setShowsNavigation,
    validateOrWarnItem,
    placeholder,
    suffix,
    hint,
    footnote,
    options,
    elseOptionValue,
    elseOptions,
    hasRating,
    ratingLabels,
  });

  if (shouldFillPage) {
    return (
      <div className={cn(styles.question, styles.fill)}>
        <TitleBlock
          page={page}
          title={title}
          description={description}
          required={required}
        />
        <Scrollable className={styles.answer}>{questionNode}</Scrollable>
      </div>
    );
  } else {
    return (
      <div className={styles.question}>
        <TitleBlock
          page={page}
          title={title}
          description={description}
          required={required}
        />
        {questionNode}
      </div>
    );
  }
};

export const QuestionTypePropType = oneOf(values(QUESTION_TYPE));

QuestionBuilder.propTypes = {
  dataKey: string.isRequired,
  defaultValue: any,
  description: string,
  elseOptionValue: string,
  elseOptions: arrayOf(OptionPropType),
  footnote: oneOfType([string, node, func]),
  hasRating: oneOfType([bool, func]),
  hint: oneOfType([string, func]),
  onChange: func.isRequired,
  onConfirm: func.isRequired,
  onSelect: func,
  options: arrayOf(OptionPropType),
  page: number.isRequired,
  placeholder: oneOfType([string, func]),
  ratingLabels: oneOfType([arrayOf(string.isRequired), func]),
  required: bool,
  search: func,
  setShowsNavigation: func.isRequired,
  suffix: string,
  title: oneOfType([string, func]).isRequired,
  type: QuestionTypePropType.isRequired,
  validateOrWarnItem: func,
  value: any,
  warning: string,
};

QuestionBuilder.defaultProps = {
  title: '',
};

export default QuestionBuilder;
