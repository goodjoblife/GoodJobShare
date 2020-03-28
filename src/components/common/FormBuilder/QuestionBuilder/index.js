import React from 'react';
import {
  string,
  bool,
  number,
  func,
  oneOf,
  oneOfType,
  arrayOf,
} from 'prop-types';

import Text from './Text';
import TextArea from './TextArea';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Rating from './Rating';
import File from './File';

const getComponent = type => {
  switch (type) {
    case 'text':
      return Text;
    case 'textarea':
      return TextArea;
    case 'radio':
      return Radio;
    case 'checkbox':
      return Checkbox;
    case 'rating':
      return Rating;
    case 'file':
      return File;
    default:
      return null;
  }
};

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
  options,
  validator,
  warning,
  minLength,
  maxRating,
  renderCustomizedQuestion,
}) => {
  if (type === 'customized') {
    if (renderCustomizedQuestion) {
      return renderCustomizedQuestion({
        page,
        title,
        description,
        dataKey,
        required,
        value,
        onChange,
        onConfirm,
        warning,
        validator,
        minLength,
        options,
        maxRating,
      });
    } else {
      return null;
    }
  }
  let Component = getComponent(type);
  if (Component) {
    return (
      <Component
        page={page}
        title={title}
        description={description}
        dataKey={dataKey}
        required={required}
        value={value}
        onChange={onChange}
        onConfirm={onConfirm}
        warning={warning}
        validator={validator}
        minLength={minLength}
        options={options}
        maxRating={maxRating}
      />
    );
  } else {
    return <div>{type}</div>;
  }
};

/*
  type = text             短文字題
       = textarea         長文字題
       = radio            單選題
       = checkbox         複選題
       = file             檔案上傳
       = rating           評分題（1-5分）
       = customized       複合型題，render function 由外部傳入
*/
QuestionBuilder.propTypes = {
  // 問題
  title: string.isRequired,
  // 問題描述
  description: string,
  // 問題種類
  type: oneOf([
    'text',
    'textarea',
    'radio',
    'checkbox',
    'rating',
    'file',
    'customized',
  ]).isRequired,
  // 該題的值的 key
  dataKey: string.isRequired,
  // 此題是否必填
  required: bool,
  // 當欄位值未通過檢查時顯示的提示
  warning: oneOfType([string, func]),
  // 驗證內容的函數
  validator: func,
  // 如果 type=textarea，則此題需要指定最少字數
  minLength: number,
  // 如果 type=radio 或 type=checkbox，代表此題有選項
  options: arrayOf(string),
  // 如果 type=rating，則此題需要最大值
  maxRating: number,
  // 如果 type=customized，代表此題是從外部傳入 render function。
  // 能不用則不用。
  renderCustomizedQuestion: func,
};

QuestionBuilder.defaultProps = {
  required: false,
};

export default QuestionBuilder;
