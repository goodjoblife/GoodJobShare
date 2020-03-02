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
  {
    title: '身份驗證',
    description:
      '若完成身份驗證，之後分享此份工作的任何資訊，獎勵都是 10 倍！可以拍下你此份工作的 名片/工作證/薪資單，或足以證明你在該公司上班的文件！',
    type: 'file',
    dataKey: 'verification',
    validator: () => true,
  },
  {
    title: '當我需要協助時，主管願意且可以貢獻他的時間協助我',
    type: 'rating',
    dataKey: 'support',
    validator: () => true,
    maxRating: 5,
  },
  {
    title: 'Question Title',
    description: 'Form Description',
    type: 'customized',
    dataKey: 'salaryWorkTime',
    validator: () => true,
    renderCustomizedQuestion() {
      return (
        <div>
          <select>
            <option>月薪</option>
          </select>
          <label>
            <input type="text" />元
          </label>
        </div>
      );
    },
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
