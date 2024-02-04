import React, { useCallback } from 'react';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
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
  createSubmitQuestion({ type: tabType.TIME_AND_SALARY }),
];

const TypeForm = ({ open, onClose }) => {
  const onSubmit = useCallback(console.info, []);
  const onSubmitError = useCallback(console.error, []);

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
