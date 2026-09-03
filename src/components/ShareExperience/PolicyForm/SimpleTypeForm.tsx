import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createPolicyReviewGroup } from 'actions/policyReviewGroup';
import { PolicyReviewInput } from 'apis/createPolicyReviewGroup';

import { toPolicyReviewInput } from './TypeForm';
import SubmittableFormBuilder from '../common/SubmittableFormBuilder';
import { CompanyJobTitleHeader } from '../common/TypeFormHeader';
import {
  createPolicyQuestions,
  createSubmitQuestion,
} from '../questionCreators';

const policyQuestions = createPolicyQuestions();

const questions = [...policyQuestions, createSubmitQuestion({ label: '制度' })];

// createPolicyQuestions 沒帶 asListOption，回傳的是單題形狀；
// questionCreators 是 JS，型別上是兩種形狀的聯集，故在此收斂
type PolicyQuestion = { label: string; dataKey: string };

const toPolicyReviews = (draft: Record<string, unknown>): PolicyReviewInput[] =>
  (policyQuestions as PolicyQuestion[]).map(({ label, dataKey }) => {
    const answer = draft[dataKey];
    // RADIO 題只有 hasPolicy，RADIO_ELSE_RADIO 題則是 [hasPolicy, detail]
    const [hasPolicy, detail] = Array.isArray(answer) ? answer : [answer, null];
    return toPolicyReviewInput([label, hasPolicy, detail, null]);
  });

type Props = {
  open: boolean;
  onClose: () => void;
  companyName: string;
  jobTitle: string;
  sector?: string;
  redirectPathnameOnSuccess: string | (() => string);
};

const SimpleTypeForm = ({
  open,
  onClose,
  companyName,
  jobTitle,
  sector,
  redirectPathnameOnSuccess,
}: Props): React.ReactElement => {
  const dispatch = useDispatch();

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
    />
  );
};

export default SimpleTypeForm;
