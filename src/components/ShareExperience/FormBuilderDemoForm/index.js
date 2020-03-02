import React from 'react';
import FormBuilder from 'common/FormBuilder';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1em',
};

const questions = [
  {
    title: '職業名稱',
    type: 'text',
    dataKey: 'title',
    required: true,
    validator: () => true,
  },
  {
    title: '我與主管合作的狀況',
    type: 'textarea',
    dataKey: 'relationship',
    required: true,
    validator: () => true,
  },
];

const FormBuilderDemoForm = () => (
  <div style={containerStyle}>
    <FormBuilder
      open
      title="請輸入你的一份工作經驗"
      submitButtonText="Submit"
      questions={questions}
      submitButtonEnabled
      onChange={console.info}
      onSubmit={console.info}
      onClickCloseBtn={console.info}
    />
  </div>
);

export default FormBuilderDemoForm;
