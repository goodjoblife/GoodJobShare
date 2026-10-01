import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createPolicyReviewGroup } from 'actions/policyReviewGroup';
import {
  CreatePolicyReviewGroupResult,
  PolicyReviewInput,
} from 'apis/createPolicyReviewGroup';
import { generatePolicyReviewGroupModal } from 'common/ShareExpSection/shareLinkTo';
import { generatePageURL, PageType } from 'constants/companyJobTitle';
import {
  Policy,
  policyByLabel,
  remoteWorkPolicyByLabel,
  YesNoOrUnknown,
} from 'constants/policy';

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

const hasPolicyMap: Record<string, YesNoOrUnknown> = {
  是: YesNoOrUnknown.yes,
  有: YesNoOrUnknown.yes,
  否: YesNoOrUnknown.no,
  沒有: YesNoOrUnknown.no,
  不知道: YesNoOrUnknown.unknown,
};

const complianceMap: Record<string, YesNoOrUnknown> = {
  '有，優於性別平等工作法': YesNoOrUnknown.yes,
  '有，符合性別平等工作法': YesNoOrUnknown.yes,
  '有，不符合性別平等工作法': YesNoOrUnknown.no,
  '有，不清楚是否符合性別平等工作法': YesNoOrUnknown.unknown,
};

export const toPolicyReviewInput = ([
  optionValue,
  radioValue,
  elseOptionValue,
  textValue,
]: unknown[]): PolicyReviewInput => {
  const policy = policyByLabel[optionValue as string];
  const hasPolicy = hasPolicyMap[radioValue as string];
  const review = (textValue as string) || undefined;

  if (policy === Policy.REMOTE_WORK) {
    return {
      policy,
      hasPolicy,
      review,
      remoteWorkPolicy: elseOptionValue
        ? remoteWorkPolicyByLabel[elseOptionValue as string]
        : undefined,
    };
  }

  if (policy === Policy.FLEXIBLE_WORKING_HOUR) {
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

const companyOverviewPathnameOf = (companyName: string): string =>
  generatePageURL({ pageType: PageType.COMPANY, pageName: companyName });

export const companyOverviewWithPolicyReviewGroupOf = (
  companyName: string,
  result: unknown,
): { pathname: string; state: unknown } => ({
  pathname: companyOverviewPathnameOf(companyName),
  ...generatePolicyReviewGroupModal(
    (result as CreatePolicyReviewGroupResult).policyReviewGroup.groupId,
  ),
});

const redirectToCompanyOverview = (
  result: unknown,
  draft: Record<string, unknown>,
): { pathname: string; state: unknown } =>
  companyOverviewWithPolicyReviewGroupOf(
    draft[DATA_KEY_COMPANY_NAME] as string,
    result,
  );

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
      redirectPathnameOnSuccess={redirectToCompanyOverview}
    />
  );
};

export default TypeForm;
