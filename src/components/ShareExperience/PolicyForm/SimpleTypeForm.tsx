import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createPolicyReviewGroup } from 'actions/policyReviewGroup';
import { PolicyReviewInput } from 'apis/createPolicyReviewGroup';

import { companyOverviewPathnameOf, toPolicyReviewInput } from './TypeForm';
import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  createPolicyQuestions,
  createSubmitQuestion,
} from '../questionCreators';

const policyQuestions = createPolicyQuestions();

const questions = [...policyQuestions, createSubmitQuestion({ label: '制度' })];

const toPolicyReviews = (draft: Record<string, unknown>): PolicyReviewInput[] =>
  policyQuestions.map(({ label, dataKey }) => {
    const answer = draft[dataKey];
    const [hasPolicy, detail] = Array.isArray(answer) ? answer : [answer, null];
    return toPolicyReviewInput([label, hasPolicy, detail, null]);
  });

type Props = {
  open: boolean;
  onClose: () => void;
  companyName: string;
  jobTitle: string;
  sector?: string;
  redirectPathnameOnQuit: string | (() => string);
};

const SimpleTypeForm = ({
  open,
  onClose,
  companyName,
  jobTitle,
  sector,
  redirectPathnameOnQuit,
}: Props): React.ReactElement => {
  const dispatch = useDispatch();

  const redirectPathnameOnSuccess = useCallback(
    () => companyOverviewPathnameOf(companyName),
    [companyName],
  );

  const onSubmit = useCallback(
    (draft: Record<string, unknown>) =>
      dispatch(
        createPolicyReviewGroup({
          company: { query: companyName },
          jobTitle,
          sector: sector || undefined,
          policyReviews: toPolicyReviews(draft),
        }),
      ),
    [companyName, dispatch, jobTitle, sector],
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmitError = useCallback(() => {}, []);

  return (
    <SubmittableFormBuilder
      open={open}
      questions={questions}
      header={
        <CompanyJobTitleHeader
          label="制度"
          companyName={companyName}
          jobTitle={jobTitle}
        />
      }
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onClose={onClose}
      hideProgressBar={false}
      redirectPathnameOnSuccess={redirectPathnameOnSuccess}
      redirectPathnameOnQuit={redirectPathnameOnQuit}
    />
  );
};

export default SimpleTypeForm;
