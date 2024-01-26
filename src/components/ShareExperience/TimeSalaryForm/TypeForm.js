import React, { useCallback } from 'react';
import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
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
  createOvertimeFrequencyQuestion,
  createOvertimeSalaryQuestion,
  createCompensatoryDayOffQuestion,
  createSubmitQuestion,
} from '../questionCreators';
import { tabType } from '../../../constants/companyJobTitle';

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
  createOvertimeFrequencyQuestion(),
  createOvertimeSalaryQuestion(),
  createCompensatoryDayOffQuestion(),
  createSubmitQuestion({ type: tabType.TIME_AND_SALARY }),
];

const TypeForm = ({ open, onClose }) => {
  const onSubmit = useCallback(async draft => {
    console.info(draft); // TODO
  }, []);
  const onSubmitError = useCallback(async error => {
    console.error(error); // TODO
  }, []);

  return (
    <SubmittableFormBuilder
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
