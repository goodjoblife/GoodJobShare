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
} from 'prop-types';

import Text from './Text';
import TextArea from './TextArea';
import { Radio, RadioElse, Checkbox, CheckboxElse } from './Checkbox';
import Rating from './Rating';
import File from './File';
import Date from './Date';
import SelectText from './SelectText';
import TextList from './TextList';

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
      return (
        <Text
          {...commonProps}
          placeholder={placeholder}
          onSelect={onSelect}
          search={search}
        />
      );
    case 'textarea':
      return <TextArea {...commonProps} />;
    case 'radio':
      return <Radio {...commonProps} options={options} />;
    case 'radio-else':
      return (
        <RadioElse
          {...commonProps}
          options={options}
          placeholder={placeholder}
        />
      );
    case 'checkbox':
      return <Checkbox {...commonProps} options={options} />;
    case 'checkbox-else':
      return (
        <CheckboxElse
          {...commonProps}
          options={options}
          placeholder={placeholder}
        />
      );
    case 'rating':
      return <Rating {...commonProps} ratingLabels={ratingLabels} />;
    case 'file':
      return <File {...commonProps} />;
    case 'date':
      return <Date {...commonProps} />;
    case 'select-text':
      return (
        <SelectText
          {...commonProps}
          placeholder={placeholder}
          options={options}
        />
      );
    case 'text-list':
      return <TextList {...commonProps} placeholder={placeholder} />;
    case 'customized':
      if (renderCustomizedQuestion) {
        return renderCustomizedQuestion({
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
        });
      } else {
        return null;
      }
    default:
      return null;
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
  options: arrayOf(string),
  ratingLabels: arrayOf(string.isRequired),
  renderCustomizedQuestion: func,
};

QuestionBuilder.defaultProps = {
  title: '',
};

export default QuestionBuilder;
