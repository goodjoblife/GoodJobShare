import React, { useCallback } from 'react';

import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import Header, { CompanyJobTitleHeader } from '../common/TypeFormHeader';

import {
  createCompanyQuestion,
  createJobTitleQuestion,
  createSectorQuestion,
  createPoliciesQuestion,
  createSubmitQuestion,
} from '../questionCreators';
import { TabType } from 'constants/companyJobTitle';
import {
  DATA_KEY_COMPANY_NAME,
  DATA_KEY_JOB_TITLE,
  DATA_KEY_SECTOR,
  DATA_KEY_POLICIES,
} from '../constants';

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
  createSubmitQuestion({ type: TabType.POLICY }),
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
      redirectPathnameOnSuccess={(): string => '/'}
    />
  );
};

export default TypeForm;
