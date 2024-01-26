import React, { useCallback } from 'react';
import R from 'ramda';
import SubmittableTypeForm from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import employmentType from '../../../constants/employmentType';

const header = <Header title="請輸入你的一份薪資工時" />;

const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="薪時"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const experienceInYearOptions = R.range(0, 51).map(String);
const questions = [
  {
    title: '職稱',
    type: 'text',
    dataKey: 'jobTitle',
    defaultValue: '',
    required: true,
    validator: value => value.length > 0,
    warning: '請填寫職稱',
  },
  {
    title: '公司名稱',
    type: 'text',
    dataKey: 'companyName',
    defaultValue: '',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '你現在在職嗎？',
    type: 'radio',
    dataKey: 'isCurrentlyEmployed',
    defaultValue: null,
    options: ['在職', '已離職'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '廠區/門市/分公司',
    type: 'text',
    dataKey: 'sector',
    defaultValue: '',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '職務型態',
    type: 'radio',
    dataKey: 'employmentType',
    defaultValue: null,
    options: R.values(employmentType),
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '性別',
    type: 'radio',
    dataKey: 'gender',
    defaultValue: null,
    options: ['男', '女', '其他'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '薪資',
    type: 'customized',
    dataKey: 'salary',
    defaultValue: null,
    renderCustomizedQuestion: () => null,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '當時業界工作經歷',
    type: 'radio',
    dataKey: 'experienceInYear',
    defaultValue: null,
    options: experienceInYearOptions,
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '工作日表訂工時',
    type: 'text',
    dataKey: 'dayPromisedWorkTime',
    defaultValue: '',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '實際平均工時',
    type: 'text',
    dataKey: 'dayRealWorkTime',
    defaultValue: '',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '一週總工時',
    type: 'text',
    dataKey: 'weekWorkTime',
    defaultValue: '',
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '加班頻率',
    type: 'radio',
    dataKey: 'overtimeFrequency',
    defaultValue: null,
    options: ['幾乎不', '偶爾', '經常', '幾乎每天'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '加班有無加班費',
    type: 'radio',
    dataKey: 'hasOvertimeSalary',
    defaultValue: null,
    options: ['有', '無', '不知道'],
    header: renderCompanyJobTitleHeader,
  },
  {
    title: '加班有無補休',
    type: 'radio',
    dataKey: 'hasCompensatoryDayoff',
    defaultValue: null,
    options: ['有', '無', '不知道'],
    header: renderCompanyJobTitleHeader,
  },
];

const TypeForm = ({ open, onClose }) => {
  const onSubmit = useCallback(async draft => {
    console.info(draft); // TODO
  }, []);
  const onSubmitError = useCallback(async error => {
    console.error(error); // TODO
  }, []);

  return (
    <SubmittableTypeForm
      open={open}
      questions={questions}
      header={header}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
    />
  );
};

export default TypeForm;
