import React from 'react';
import R from 'ramda';
import FormBuilder from 'common/FormBuilder';
import Header, { JobTitleHeader } from '../common/TypeFormHeader';
import Footer from '../common/TypeFormFooter';

import employmentType from '../../../constants/employmentType';

const header = <Header />;
const footer = <Footer />;

const experienceInYearOptions = R.range(0, 51).map(String);
const questions = [
  {
    title: '職稱',
    type: 'text',
    dataKey: 'jobTitle',
    required: true,
    validator: value => value.length > 0,
    warning: '請填寫職稱',
  },
  {
    title: '公司名稱',
    type: 'text',
    dataKey: 'title',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '你現在在職嗎？',
    type: 'radio',
    dataKey: 'isCurrentlyEmployed',
    options: ['在職', '已離職'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '廠區/門市/分公司',
    type: 'text',
    dataKey: 'sector',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '職務型態',
    type: 'radio',
    dataKey: 'employmentType',
    options: R.values(employmentType),
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '性別',
    type: 'radio',
    dataKey: 'gender',
    options: ['男', '女', '其他'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '薪資',
    type: 'customized',
    dataKey: 'salary',
    renderCustomizedQuestion: () => null,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '當時業界工作經歷',
    type: 'radio',
    dataKey: 'experienceInYear',
    options: experienceInYearOptions,
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '工作日表訂工時',
    type: 'text',
    dataKey: 'dayPromisedWorkTime',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '實際平均工時',
    type: 'text',
    dataKey: 'dayRealWorkTime',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '一週總工時',
    type: 'text',
    dataKey: 'weekWorkTime',
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '加班頻率',
    type: 'radio',
    dataKey: 'overtimeFrequency',
    options: ['幾乎不', '偶爾', '經常', '幾乎每天'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '加班有無加班費',
    type: 'radio',
    dataKey: 'hasOvertimeSalary',
    options: ['有', '無', '不知道'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
  {
    title: '加班有無補休',
    type: 'radio',
    dataKey: 'hasCompensatoryDayoff',
    options: ['有', '無', '不知道'],
    header: ({ jobTitle }) => <JobTitleHeader jobTitle={jobTitle} />,
  },
];

const TypeForm = ({ open, onClose }) => {
  return (
    <FormBuilder
      open={open}
      onClose={onClose}
      header={header}
      footer={footer}
      questions={questions}
    />
  );
};

export default TypeForm;
