import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryRatingStatistics } from 'actions/company';
import Glike from 'common/icons/Glike';
import { paramsSelector } from 'common/routing/selectors';
import familyCareLeaveIcon from 'components/CompanyAndJobTitle/familyCareLeaveIcon.svg';
import LeavePolicySection from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveBulletByLabel } from 'components/CompanyAndJobTitle/LeaveSectionBlock';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import { ServerSideRender } from 'types/serverSideRender';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import useCompanyPolicyReviews from './useCompanyPolicyReviews';

const AVAILABILITY_BULLET_BY_LABEL: LeaveBulletByLabel = {
  是: { text: '請得到家庭照顧假', icon: <Glike /> },
  否: '請不到家庭照顧假',
  不知道: '不確定是否請得到家庭照顧假',
};

const COMPLIANCE_BULLET_BY_LABEL: LeaveBulletByLabel = {
  符合勞基法: { text: '家庭照顧假符合勞基法', icon: <Glike /> },
  不符合勞基法: '家庭照顧假不符合勞基法',
  不知道: '不確定家庭照顧假是否符合勞基法',
};

const FILTER_OPTIONS = [
  { value: '是', label: '請得到家庭照顧假' },
  { value: '否', label: '請不到家庭照顧假' },
  { value: '不知道', label: '不知道' },
];

type Params = { companyName: string };

const CompanyFamilyChildcareFamilyCareLeaveProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const companyName = useCompanyNameParam();
  const page = usePage();
  const { records, section, totalCount } = useCompanyPolicyReviews({
    companyName,
    policy: 'FAMILY_CARE_LEAVE',
    start: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  return (
    <LeavePolicySection
      pageType={PageType.COMPANY}
      pageName={companyName}
      tabType={TabType.FAMILY_CHILDCARE}
      title="家庭照顧假"
      icon={familyCareLeaveIcon}
      availabilityTitle="是否請得到家庭照顧假？"
      availabilityBulletByLabel={AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="家庭照顧假法規符合度"
      complianceBulletByLabel={COMPLIANCE_BULLET_BY_LABEL}
      section={section}
      availabilityColumnTitle="是否請得到家庭照顧假"
      complianceColumnTitle="勞基法符合度"
      filterOptions={FILTER_OPTIONS}
      records={records}
      totalCount={totalCount}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
};

CompanyFamilyChildcareFamilyCareLeaveProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  return dispatch(queryRatingStatistics(companyName));
};

export default CompanyFamilyChildcareFamilyCareLeaveProvider;
