import React, { useCallback } from 'react';
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
  createExperienceInYearQuestion,
  createDayPromisedWorkTimeQuestion,
  createDayRealWorkTimeQuestion,
  createWeekWorkTimeQuestion,
} from '../questionCreators';

const header = <Header title="請輸入你的一份薪資工時" />;

const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="薪時"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const questions = [
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createCurrentlyEmployedQuestion(),
  createSectorQuestion(),
  createEmployTypeQuestion(),
  createGenderQuestion(),
  createRequiredSalaryQuestion(),
  createExperienceInYearQuestion(),
  createDayPromisedWorkTimeQuestion(),
  createDayRealWorkTimeQuestion(),
  createWeekWorkTimeQuestion(),
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
