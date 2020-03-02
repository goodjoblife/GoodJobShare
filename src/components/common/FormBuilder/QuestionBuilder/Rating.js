import React from 'react';
import Text from './Text';
import TextArea from './TextArea';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Rating from './Rating';
import File from './File';

const QustionBuilder = ({
  title,
  description,
  type,
  dataKey,
  required,
  validator,
  renderCustomizedQuestion,
}) => {
  switch (type) {
    case 'text':
      return <Text />;
    case 'textarea':
      return <TextArea />;
    case 'radio':
      return <Radio />;
    case 'checkbox':
      return <Checkbox />;
    case 'rating':
      return <Rating />;
    case 'file':
      return <File />;
    case 'customized':
      if (renderCustomizedQuestion) {
        return renderCustomizedQuestion();
      } else {
        return null;
      }
    default:
      return <div>{type}</div>;
  }
};

export default QustionBuilder;
