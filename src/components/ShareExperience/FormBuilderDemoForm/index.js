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
  {
    title: '工作地區',
    type: 'radio',
    dataKey: 'workingArea',
    required: true,
    validator: () => true,
    options: [
      '台北市',
      '新北市',
      '桃園市',
      '新竹市',
      '苗栗縣',
      '台中市',
      '彰化縣',
      '雲林縣',
      '嘉義市',
      '台南市',
      '高雄市',
      '屏東縣',
      '台東市',
      '花蓮縣',
    ],
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
