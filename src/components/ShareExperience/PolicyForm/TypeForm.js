import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createSectorQuestion,
  createPoliciesQuestion,
} from '../questionCreators';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_SECTOR,
  DATA_KEY_POLICIES,
} from '../constants';

const header = <Header title="請分享你的公司制度實況" />;

const renderCompanyJobTitleHeader = ({ companyName, jobTitle }) => (
  <CompanyJobTitleHeader
    label="制度"
    companyName={companyName}
    jobTitle={jobTitle}
  />
);

const questions = [
  createCompanyQuestion({ header }),
  createJobTitleQuestion({ header }),
  createSectorQuestion(),
  createPoliciesQuestion(),
];

// eslint-disable-next-line @typescript-eslint/camelcase
const bodyFromDraft = draft => ({
  company: { id: '', query: draft[DATA_KEY_COMPANY_NAME] },
  // eslint-disable-next-line @typescript-eslint/camelcase
  job_title: draft[DATA_KEY_JOB_TITLE],
  sector: draft[DATA_KEY_SECTOR],
  policies: draft[DATA_KEY_POLICIES].map(
    ([policy, answer, lawCompliance, experience]) => ({
      policy,
      answer,
      // eslint-disable-next-line @typescript-eslint/camelcase
      law_compliance: lawCompliance,
      experience,
    }),
  ),
});

const TypeForm = ({ open, onClose }) => {
  const onSubmit = useCallback(async draft => {
    // TODO: wire up to backend API once endpoint is ready
    const body = bodyFromDraft(draft);
    return body;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmitError = useCallback(() => {}, []);

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={renderCompanyJobTitleHeader}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
      redirectPathnameOnSuccess={() => '/'}
    />
  );
};

TypeForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default TypeForm;
