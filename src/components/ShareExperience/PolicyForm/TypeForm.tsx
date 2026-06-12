import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createPolicyReviewGroup } from 'actions/policyReviewGroup';
import { PolicyReviewInput } from 'apis/createPolicyReviewGroup';

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

const policyEnumMap: Record<string, string> = {
  生理假: 'MENSTRUAL_LEAVE',
  育嬰假: 'PARENTAL_LEAVE',
  家庭照顧假: 'FAMILY_CARE_LEAVE',
  彈性上下班時間: 'FLEXIBLE_WORKING_HOUR',
  遠端工作: 'REMOTE_WORK',
};

const hasPolicyMap: Record<string, string> = {
  是: 'yes',
  有: 'yes',
  否: 'no',
  沒有: 'no',
  不知道: 'unknown',
};

const complianceMap: Record<string, string> = {
  '有，優於性別平等工作法': 'yes',
  '有，符合性別平等工作法': 'yes',
  '有，不符合性別平等工作法': 'no',
  '有，不清楚是否符合性別平等工作法': 'unknown',
};

const remoteWorkPolicyMap: Record<string, string> = {
  每週一天: 'ONE_DAY_PER_WEEK',
  每週兩天: 'TWO_DAYS_PER_WEEK',
  每週三天: 'THREE_DAYS_PER_WEEK',
  每週四天: 'FOUR_DAYS_PER_WEEK',
  不限天數: 'NO_LIMIT',
};

const toPolicyReviewInput = ([
  optionValue,
  radioValue,
  elseOptionValue,
  textValue,
]: unknown[]): PolicyReviewInput => {
  const policy = policyEnumMap[optionValue as string];
  const hasPolicy = hasPolicyMap[radioValue as string];
  const review = (textValue as string) || undefined;

  if (policy === 'REMOTE_WORK') {
    return {
      policy,
      hasPolicy,
      review,
      remoteWorkPolicy: elseOptionValue
        ? remoteWorkPolicyMap[elseOptionValue as string]
        : undefined,
    };
  }

  if (policy === 'FLEXIBLE_WORKING_HOUR') {
    return { policy, hasPolicy, review };
  }

  return {
    policy,
    hasPolicy,
    review,
    compliance: elseOptionValue
      ? complianceMap[elseOptionValue as string]
      : undefined,
  };
};

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
