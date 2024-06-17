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

import TitleBlock from '../TitleBlock';
import Scrollable from '../Scrollable';
import styles from './styles.module.css';
import { OptionPropType } from './Checkbox/PropTypes';

export const QUESTION_TYPE = {
  TEXT: 'TEXT',
  TEXTAREA: 'TEXTAREA',
  RADIO: 'RADIO',
  RADIO_ELSE: 'RADIO_ELSE',
  RADIO_ELSE_RADIO: 'RADIO_ELSE_RADIO',
  RADIO_ELSE_DATE: 'RADIO_ELSE_DATE',
  CHECKBOX: 'CHECKBOX',
  CHECKBOX_ELSE: 'CHECKBOX_ELSE',
  RATING: 'RATING',
  FILE: 'FILE',
  DATE: 'DATE',
  SELECT_TEXT: 'SELECT_TEXT',
  TEXT_LIST: 'TEXT_LIST',
  CUSTOMIZED: 'CUSTOMIZED',
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
  hint,
  placeholder,
  suffix,
  footnote,
  options,
  elseOptionValue,
  elseOptions,
  ratingLabels,
  renderCustomizedQuestion,
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
  };
  switch (type) {
    case QUESTION_TYPE.TEXT:
      return [
        false,
        <Text
          {...commonProps}
          placeholder={placeholder}
          onSelect={onSelect}
          search={search}
          footnote={footnote}
        />,
      ];
    case QUESTION_TYPE.TEXTAREA:
      return [true, <TextArea {...commonProps} footnote={footnote} />];
    case QUESTION_TYPE.RADIO:
      return [true, <Radio {...commonProps} options={options} />];
    case QUESTION_TYPE.RADIO_ELSE:
      return [
        true,
        <RadioElse
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          placeholder={placeholder}
        />,
      ];
    case QUESTION_TYPE.RADIO_ELSE_RADIO:
      return [
        true,
        <RadioElseRadio
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          elseOptions={elseOptions}
        />,
      ];
    case QUESTION_TYPE.RADIO_ELSE_DATE:
      return [
        true,
        <RadioElseDate
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
        />,
      ];
    case QUESTION_TYPE.CHECKBOX:
      return [true, <Checkbox {...commonProps} options={options} />];
    case QUESTION_TYPE.CHECKBOX_ELSE:
      return [
        true,
        <CheckboxElse
          {...commonProps}
          options={options}
          elseOptionValue={elseOptionValue}
          placeholder={placeholder}
        />,
      ];
    case QUESTION_TYPE.RATING:
      return [false, <Rating {...commonProps} ratingLabels={ratingLabels} />];
    case QUESTION_TYPE.FILE:
      return [false, <File {...commonProps} />];
    case QUESTION_TYPE.DATE:
      return [false, <Date {...commonProps} />];
    case QUESTION_TYPE.SELECT_TEXT:
      return [
        false,
        <SelectText
          {...commonProps}
          placeholder={placeholder}
          hint={hint}
          options={options}
          suffix={suffix}
          footnote={footnote}
        />,
      ];
    case QUESTION_TYPE.TEXT_LIST:
      return [true, <TextList {...commonProps} placeholder={placeholder} />];
    case QUESTION_TYPE.CUSTOMIZED:
      if (renderCustomizedQuestion) {
        return [
          false,
          renderCustomizedQuestion({
            page,
            title,
            description,
            type,
            dataKey,
            required,
            value,
            onChange,
            onConfirm,
            warning,
          }),
        ];
      } else {
        return [false, null];
      }
    default:
      return [false, null];
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
  hint,
  placeholder,
  suffix,
  footnote,
  options,
  elseOptionValue,
  elseOptions,
  ratingLabels,
  renderCustomizedQuestion,
}) => {
  const [shouldFillPage, questionNode] = useQuestionNode({
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
    placeholder,
    suffix,
    hint,
    footnote,
    options,
    elseOptionValue,
    elseOptions,
    ratingLabels,
    renderCustomizedQuestion,
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
  hint: oneOfType([string, func]),
  onChange: func.isRequired,
  onConfirm: func.isRequired,
  onSelect: func,
  options: arrayOf(OptionPropType),
  page: number.isRequired,
  placeholder: string,
  ratingLabels: arrayOf(string.isRequired),
  renderCustomizedQuestion: func,
  required: bool,
  search: func,
  suffix: string,
  title: oneOfType([string, func]).isRequired,
  type: QuestionTypePropType.isRequired,
  value: any,
  warning: string,
};

QuestionBuilder.defaultProps = {
  title: '',
};

export default QuestionBuilder;
