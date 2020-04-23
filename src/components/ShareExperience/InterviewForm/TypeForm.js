import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import FormBuilder from 'common/FormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import Footer from '../common/TypeFormFooter';
import { getCompaniesSearch } from '../../../apis/companySearchApi';
import { getJobTitlesSearch } from '../../../apis/jobTitleSearchApi';

const header = <Header />;
const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    pageName="面試"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);
const footer = <Footer />;

const experienceInYearOptions = R.range(0, 51).map(String);
const questions = [
  {
    title: '公司名稱',
    type: 'text',
    dataKey: 'companyName',
    required: true,
    validator: value => value.length > 0,
    warning: '請填寫公司名稱',
    placeholder: 'ＯＯ 股份有限公司',
    search: value =>
      getCompaniesSearch({ key: value }).then(
        R.ifElse(
          R.compose(
            R.equals('Array'),
            R.type,
          ),
          R.map(R.prop('name')),
          R.always([]),
        ),
      ),
  },
  {
    title: '應徵職稱',
    type: 'text',
    dataKey: 'jobTitle',
    required: true,
    validator: value => value.length > 0,
    warning: '請填寫職稱',
    placeholder: '軟體工程師',
    search: value =>
      getJobTitlesSearch({ key: value }).then(
        R.when(
          R.compose(
            R.not,
            R.equals('Array'),
            R.type,
          ),
          R.always([]),
        ),
      ),
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
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '什麼時候去面試的呢？',
    type: 'customized',
    dataKey: 'interviewTime',
    renderCustomizedQuestion: () => null,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '自身相關職務工作經驗',
    type: 'radio',
    dataKey: 'experienceInYear',
    options: experienceInYearOptions,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試結果',
    type: 'radio',
    dataKey: 'interviewResult',
    options: ['錄取', '未錄取', '沒通知', '其他'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '待遇',
    type: 'customized',
    dataKey: 'salary',
    renderCustomizedQuestion: () => null,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '為這次的面試評個分',
    type: 'rating',
    dataKey: 'overallRating',
    maxRating: 5,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試過程',
    type: 'textarea',
    dataKey: 'sections',
    minLength: 30,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試中問了什麼問題呢？',
    type: 'textarea',
    dataKey: 'interviewQas',
    minLength: 30,
    header: renderCompanyJobTitleHeader,
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
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '給其他面試者的中肯建議',
    type: 'textarea',
    dataKey: 'suggestionSection',
    minLength: 30,
    header: renderCompanyJobTitleHeader,
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
