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

import Text from './Text';
import TextArea from './TextArea';
import { Radio, RadioElse, Checkbox, CheckboxElse } from './Checkbox';
import Rating from './Rating';
import File from './File';
import Date from './Date';
import SelectText from './SelectText';
import TextList from './TextList';

import TitleBlock from '../TitleBlock';
import Scrollable from '../Scrollable';
import styles from './styles.module.css';
import { OptionPropType } from './Checkbox/PropTypes';

export const availableTypes = [
  'text',
  'textarea',
  'radio',
  'radio-else',
  'checkbox',
  'checkbox-else',
  'rating',
  'file',
  'date',
  'select-text',
  'text-list',
  'customized',
];

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
  validator,
  placeholder,
  suffix,
  footnote,
  options,
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
    validator,
  };
  switch (type) {
    case 'text':
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
    case 'textarea':
      return [true, <TextArea {...commonProps} footnote={footnote} />];
    case 'radio':
      return [true, <Radio {...commonProps} options={options} />];
    case 'radio-else':
      return [
        true,
        <RadioElse
          {...commonProps}
          options={options}
          placeholder={placeholder}
        />,
      ];
    case 'checkbox':
      return [true, <Checkbox {...commonProps} options={options} />];
    case 'checkbox-else':
      return [
        true,
        <CheckboxElse
          {...commonProps}
          options={options}
          placeholder={placeholder}
        />,
      ];
    case 'rating':
      return [false, <Rating {...commonProps} ratingLabels={ratingLabels} />];
    case 'file':
      return [false, <File {...commonProps} />];
    case 'date':
      return [false, <Date {...commonProps} />];
    case 'select-text':
      return [
        false,
        <SelectText
          {...commonProps}
          placeholder={placeholder}
          options={options}
          suffix={suffix}
          footnote={footnote}
        />,
      ];
    case 'text-list':
      return [true, <TextList {...commonProps} placeholder={placeholder} />];
    case 'customized':
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
            validator,
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
  validator,
  placeholder,
  suffix,
  footnote,
  options,
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
    validator,
    placeholder,
    suffix,
    footnote,
    options,
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

QuestionBuilder.propTypes = {
  page: number.isRequired,
  title: oneOfType([string, func]).isRequired,
  description: string,
  type: oneOf(availableTypes).isRequired,
  dataKey: string.isRequired,
  required: bool,
  defaultValue: any,
  value: any,
  onChange: func.isRequired,
  warning: string,
  validator: func,
  onConfirm: func.isRequired,
  onSelect: func,
  search: func,
  placeholder: string,
  footnote: oneOfType([string, node, func]),
  options: arrayOf(OptionPropType),
};

QuestionBuilder.defaultProps = {
  title: '',
};

export default QuestionBuilder;
