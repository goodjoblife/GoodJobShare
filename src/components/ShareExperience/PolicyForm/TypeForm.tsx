import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createPolicyReviewGroup } from 'actions/policyReviewGroup';

import toPolicyReviewInput from './toPolicyReviewInput';
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

const TypeForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.ReactElement => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (draft: Record<string, unknown>) => {
      const result = await dispatch(
        createPolicyReviewGroup({
          company: { query: draft[DATA_KEY_COMPANY_NAME] as string },
          jobTitle: draft[DATA_KEY_JOB_TITLE] as string,
          sector: (draft[DATA_KEY_SECTOR] as string) || undefined,
          policyReviews: (draft[DATA_KEY_POLICIES] as unknown[][]).map(
            toPolicyReviewInput,
          ),
        }),
      );
      return result;
    },
    [dispatch],
  );

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
