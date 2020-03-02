import React from 'react';
import { string, bool, func, oneOf } from 'prop-types';

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
  title,
  description,
  type,
  dataKey,
  required,
  validator,
  renderCustomizedQuestion,
}) => {
  if (type === 'customized') {
    if (renderCustomizedQuestion) {
      return renderCustomizedQuestion();
    } else {
      return null;
    }
  }
  let Component = getComponent(type);
  if (Component) {
    return <Component />;
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
  required: bool.isRequired,
  // 驗證內容的函數
  validator: func,
  // 如果 type=customized，代表此題是從外部傳入 render function。
  // 能不用則不用。
  renderCustomizedQuestion: func,
};

export default QuestionBuilder;
