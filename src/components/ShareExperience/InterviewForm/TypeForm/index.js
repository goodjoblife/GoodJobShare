import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { useDispatch } from 'react-redux';

import FormBuilder from 'common/FormBuilder';
import Header, { CompanyJobTitleHeader } from '../../common/TypeFormHeader';
import Footer from '../../common/TypeFormFooter';
import { getCompaniesSearch } from '../../../../apis/companySearchApi';
import { getJobTitlesSearch } from '../../../../apis/jobTitleSearchApi';
import { createInterviewExperience } from '../../../../actions/experiences';

const header = <Header title="請輸入你的一份面試經驗" />;
const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="面試"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);
const footer = <Footer />;

const questions = [
  {
    title: '公司名稱',
    type: 'text',
    dataKey: 'companyName',
    defaultValue: '',
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
    defaultValue: '',
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
    title: '什麼時候去面試的呢？',
    type: 'date',
    dataKey: 'interviewTime',
    defaultValue: [null, null],
    required: true,
    validator: ([year, month]) => year !== null && month !== null,
    warning: ([year, month]) =>
      `需填寫面試${[!year && '年份', !month && '月份']
        .filter(Boolean)
        .join(' 及 ')}`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試地區',
    type: 'radio',
    dataKey: 'region',
    defaultValue: null,
    required: true,
    validator: value => !!value,
    warning: '需填寫面試地區',
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
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試結果',
    type: 'radio-else',
    dataKey: 'interviewResult',
    defaultValue: [null, ''],
    required: true,
    validator: ([selected, elseText]) =>
      selected === '其他' ? !!elseText : !!selected,
    warning: '需填寫面試結果',
    options: ['錄取', '未錄取', '沒通知', '其他'],
    placeholder: '輸入面試結果',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '為這次的面試經驗評個分吧！',
    type: 'rating',
    dataKey: 'overallRating',
    defaultValue: 0,
    required: true,
    validator: value => !!value,
    warning: '需選取面試滿意程度',
    ratingLabels: ['差', '普通', '不錯啦～', '很好！', '大推！'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試過程',
    type: 'textarea',
    dataKey: 'interviewContent',
    defaultValue: `第一次面試：
第二次面試：
工作環境：`,
    required: true,
    validator: value => value.replace(/\n/g, '').length >= 50,
    warning: value => `最少 50 字，現在 ${value.replace(/\n/g, '').length} 字`,
    footnote: value => `最少 50 字，現在 ${value.replace(/\n/g, '').length} 字`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '給其他面試者的中肯建議',
    type: 'textarea',
    dataKey: 'suggestions',
    defaultValue: `如何準備面試：
是否推薦此份工作：
其他注意事項：`,
    required: true,
    validator: value => value.replace(/\n/g, '').length >= 50,
    warning: value => `最少 50 字，現在 ${value.replace(/\n/g, '').length} 字`,
    footnote: value => `最少 50 字，現在 ${value.replace(/\n/g, '').length} 字`,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: ({ jobTitle }) => `從事${jobTitle}相關的工作多久？`,
    type: 'radio',
    dataKey: 'experienceInYear',
    defaultValue: null,
    options: R.range(0, 51)
      .map(String)
      .map(
        R.ifElse(R.equals('0'), R.always('不到 1 年'), R.flip(R.concat)(' 年')),
      ),
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面談薪資',
    type: 'select-text',
    dataKey: 'salary',
    defaultValue: [null, ''],
    validator: ([type, amount]) =>
      !!type ? !!amount && !isNaN(Number(amount.replace(/,/g, ''))) : !amount,
    warning: ([type, amount]) =>
      !!type && (!amount || isNaN(Number(amount.replace(/,/g, ''))))
        ? '需填寫薪資'
        : !type && !!amount
        ? '需選擇薪水類型'
        : null,
    options: ['年薪', '月薪', '日薪', '時薪'],
    placeholder: '700,000',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '面試中問了什麼問題？',
    type: 'text-list',
    dataKey: 'interviewQas',
    defaultValue: [],
    validator: value =>
      value.every(
        R.compose(
          R.lt(0),
          R.length,
        ),
      ),
    warning: '需填寫面試問題內容',
    placeholder: '面試問題',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '是否有以下特殊問題？',
    type: 'checkbox-else',
    dataKey: 'sensitiveQuestions',
    defaultValue: [[], ''],
    validator: ([selected, elseText]) =>
      !R.contains('其他', selected) || !!elseText,
    warning: ([selected, elseText]) =>
      R.contains('其他', selected) && !elseText
        ? '需填寫其他特殊問題的內容'
        : null,
    options: [
      '詢問家庭狀況',
      '曾詢問婚姻狀況、生育計畫',
      '曾要求繳交身分證、保證金',
      '其他',
    ],
    placeholder: '輸入其他特殊問題內容',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: () => () =>
      '感謝你分享面試心得，按下「送出」，馬上就可以解鎖全站 2 萬多筆資料哦！',
    type: 'customized',
    dataKey: '',
  },
];

const bodyFromDraft = draft => ({
  company: { id: '', query: draft.companyName },
  region: draft.region,
  job_title: draft.jobTitle,
  title: '面試經驗分享',
  sections: [
    {
      subtitle: '面試過程',
      content: draft.interviewContent,
    },
    {
      subtitle: '給其他面試者的中肯建議',
      content: draft.suggestions,
    },
  ],
  experience_in_year:
    draft.experienceInYear === '不到 1 年'
      ? 0
      : parseInt(draft.experienceInYear, 10),
  education: '',
  email: '',
  interview_time: {
    year: draft.interviewTime[0],
    month: draft.interviewTime[1],
  },
  interview_result:
    draft.interviewResult[0] === '其他'
      ? draft.interviewResult[1]
      : draft.interviewResult[0],
  interview_qas: draft.interviewQas.map(question => ({ question, answer: '' })),
  interview_sensitive_questions: [
    ...draft.sensitiveQuestions[0].filter(question => question !== '其他'),
    ...(draft.sensitiveQuestions[0].indexOf('其他') >= 0
      ? []
      : [draft.sensitiveQuestions[1]]),
  ],
  salary: {
    type:
      draft.salary[0] === '年薪'
        ? 'year'
        : draft.salary[0] === '月薪'
        ? 'month'
        : draft.salary[0] === '日薪'
        ? 'day'
        : draft.salary[0] === '時薪'
        ? 'hour'
        : '',
    amount: parseInt(draft.salary[1], 10),
  },
  overall_rating: draft.overallRating,
});

const TypeForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async draft => {
      await dispatch(
        createInterviewExperience({
          body: bodyFromDraft(draft),
        }),
      );
    },
    [dispatch],
  );
  return (
    <FormBuilder
      open={open}
      onClose={onClose}
      questions={questions}
      header={header}
      footer={footer}
      onSubmit={handleSubmit}
    />
  );
};

TypeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TypeForm;
