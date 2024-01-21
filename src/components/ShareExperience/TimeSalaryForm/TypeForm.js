import React, { useCallback } from 'react';
import R from 'ramda';
import SubmittableTypeForm from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createCurrentlyEmployedQuestion,
  createEmployTypeQuestion,
  createSectorQuestion,
  createGenderQuestion,
  createRequiredSalaryQuestion,
} from '../questionCreators';

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
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createCurrentlyEmployedQuestion(),
  createSectorQuestion(),
  createEmployTypeQuestion(),
  createGenderQuestion(),
  createRequiredSalaryQuestion(),
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
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
    />
  );
};

export default TypeForm;
