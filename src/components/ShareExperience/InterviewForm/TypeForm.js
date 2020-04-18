import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import FormBuilder from 'common/FormBuilder';
import Header, { JobTitleHeader } from '../common/TypeFormHeader';
import Footer from '../common/TypeFormFooter';

const header = <Header />;
const footer = <Footer />;

const experienceInYearOptions = R.range(0, 51).map(String);
const questions = [
  {
    title: '應徵職稱',
    type: 'text',
    dataKey: 'jobTitle',
    required: true,
    validator: value => value.length > 0,
    warning: '請填寫職稱',
  },
  {
    title: '公司名稱',
    type: 'text',
    dataKey: 'companyQuery',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '面試地區',
    type: 'radio',
    options: [
      '基隆市',
      '臺北市',
      '新北市',
      '桃園市',
      '新竹市',
      '新竹縣',
      '苗栗縣',
      '臺中市',
      '彰化縣',
      '南投縣',
      '雲林縣',
      '嘉義市',
      '嘉義縣',
      '臺南市',
      '高雄市',
      '屏東縣',
      '臺東縣',
      '花蓮縣',
      '宜蘭縣',
      '澎湖縣',
      '金門縣',
      '連江縣',
    ],
    dataKey: 'region',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '什麼時候去面試的呢？',
    type: 'customized',
    dataKey: 'interviewTime',
    renderCustomizedQuestion: () => null,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '自身相關職務工作經驗',
    type: 'radio',
    dataKey: 'experienceInYear',
    options: experienceInYearOptions,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '面試結果',
    type: 'radio',
    dataKey: 'interviewResult',
    options: ['錄取', '未錄取', '沒通知', '其他'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '待遇',
    type: 'customized',
    dataKey: 'salary',
    renderCustomizedQuestion: () => null,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '為這次的面試評個分',
    type: 'rating',
    dataKey: 'overallRating',
    maxRating: 5,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  { title: '面試過程', type: 'textarea', dataKey: 'sections', minLength: 30 },
  {
    title: '面試中問了什麼問題呢？',
    type: 'textarea',
    dataKey: 'interviewQas',
    minLength: 30,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '是否有以下特殊問題？',
    type: 'checkbox',
    dataKey: 'interviewSensitiveQuestions',
    options: [
      '詢問家庭狀況',
      '曾詢問婚姻狀況、生育計畫',
      '曾要求繳交身分證、保證金',
      '其他',
    ],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '給其他面試者的中肯建議',
    type: 'textarea',
    dataKey: 'suggestionSection',
    minLength: 30,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
];

const TypeForm = ({ open, onClose }) => {
  return (
    <FormBuilder
      open={open}
      onClose={onClose}
      questions={questions}
      header={header}
      footer={footer}
    />
  );
};

TypeForm.propTypes = {
  open: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
};

export default TypeForm;
