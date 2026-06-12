import React, { useCallback } from 'react';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_POLICIES,
  DATA_KEY_SECTOR,
} from '../constants';
import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createPoliciesQuestion,
  createSectorQuestion,
  createSubmitQuestion,
} from '../questionCreators';

const header = <Header title="請分享你的公司制度實況" />;

const renderCompanyJobTitleHeader = ({
  companyName,
  jobTitle,
}: {
  companyName: string;
  jobTitle: string;
}): React.ReactElement => (
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
  createSubmitQuestion({ label: '制度' }),
];

const jobTitleKey = 'job_title';
const lawComplianceKey = 'law_compliance';

const bodyFromDraft = (
  draft: Record<string, unknown>,
): Record<string, unknown> => ({
  company: { id: '', query: draft[DATA_KEY_COMPANY_NAME] },
  [jobTitleKey]: draft[DATA_KEY_JOB_TITLE],
  sector: draft[DATA_KEY_SECTOR],
  policies: (draft[DATA_KEY_POLICIES] as unknown[][]).map(
    ([policy, answer, lawCompliance, experience]) => ({
      policy,
      answer,
      [lawComplianceKey]: lawCompliance,
      experience,
    }),
  ),
});

const TypeForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.ReactElement => {
  const onSubmit = useCallback(async (draft: Record<string, unknown>) => {
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
      hideProgressBar={false}
      redirectPathnameOnSuccess={(): string => '/'}
    />
  );
};

export default TypeForm;
