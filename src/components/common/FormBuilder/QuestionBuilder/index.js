import React from 'react';
import { string, any, bool, number, func, oneOf, arrayOf } from 'prop-types';

import Text from './Text';
import TextArea from './TextArea';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Rating from './Rating';
import File from './File';

export const availableTypes = [
  'text',
  'textarea',
  'radio',
  'checkbox',
  'rating',
  'file',
  'customized',
];

const QuestionBuilder = ({
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
  placeholder,
  minLength,
  options,
  maxRating,
  renderCustomizedQuestion,
}) => {
  const commonProps = {
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
  };
  switch (type) {
    case 'text':
      return <Text {...commonProps} placeholder={placeholder} />;
    case 'textarea':
      return <TextArea {...commonProps} minLength={minLength} />;
    case 'radio':
      return <Radio {...commonProps} options={options} />;
    case 'checkbox':
      return <Checkbox {...commonProps} options={options} />;
    case 'rating':
      return <Rating {...commonProps} maxRating={maxRating} />;
    case 'file':
      return <File {...commonProps} />;
    case 'customized':
      if (renderCustomizedQuestion) {
        return renderCustomizedQuestion(value, onChange);
      } else {
        return null;
      }
    default:
      return null;
  }
};

QuestionBuilder.propTypes = {
  page: number.isRequired,
  title: string.isRequired,
  description: string,
  type: oneOf(availableTypes).isRequired,
  dataKey: string.isRequired,
  required: bool,
  value: any,
  onChange: func.isRequired,
  warning: string,
  validator: func,
  onConfirm: func.isRequired,
  placeholder: string,
  minLength: number,
  options: arrayOf(string),
  maxRating: number,
  renderCustomizedQuestion: func,
};

QuestionBuilder.defaultProps = {
  title: '',
};

export default QuestionBuilder;
