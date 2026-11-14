import React from 'react';

import { Section } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';
import { Aspect } from 'constants/companyJobTitle';

import AspectScoreCard, { useAspectsData } from '../AspectScoreCard';
import {
  FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  FLEXIBLE_HOURS_AVAILABILITY_BULLET_BY_LABEL,
  PARENTAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  PARENTAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  REMOTE_WORK_AVAILABILITY_BULLET_BY_LABEL,
  REMOTE_WORK_FREQUENCY_BULLET_BY_LABEL,
} from '../constants';
import EmptyView from '../EmptyView';
import familyCareLeaveIcon from '../familyCareLeaveIcon.svg';
import flexibleHoursIcon from '../flexibleHoursIcon.svg';
import { useCompanyName, usePageContext } from '../PageContextProvider';
import parentalLeaveIcon from '../parentalLeaveIcon.svg';
import PolicySection from '../PolicySection';
import {
  isLeaveSectionEmpty,
  LeaveSection,
  PolicyDistribution,
} from '../policyTypes';
import remoteWorkIcon from '../remoteWorkIcon.svg';
import styles from './FamilyChildcareSection.module.css';

export type FamilyChildcareData = {
  parentalLeave: LeaveSection;
  familyCareLeave: LeaveSection;
  flexibleHours: PolicyDistribution;
  remoteWork: LeaveSection;
};

type Props = {
  data: FamilyChildcareData;
  parentalLeaveLinkTo?: string;
  familyCareLeaveLinkTo?: string;
  flexibleHoursLinkTo?: string;
  remoteWorkLinkTo?: string;
};

const SCORE_ASPECTS = [Aspect.WORK_LIFE_BALANCE, Aspect.GENDER];

const FamilyChildcareSection: React.FC<Props> = ({
  data,
  parentalLeaveLinkTo,
  familyCareLeaveLinkTo,
  flexibleHoursLinkTo,
  remoteWorkLinkTo,
}) => {
  const { tabType } = usePageContext();
  const companyName = useCompanyName();
  const hasAspectScores = useAspectsData(companyName, SCORE_ASPECTS).length > 0;

  // 彈性上下班沒有法規符合度，只有一張分佈圖，仍湊成 LeaveSection 以共用空值判斷
  const flexibleHours: LeaveSection = {
    dataCount: data.flexibleHours.dataCount,
    availability: data.flexibleHours,
  };
  const leaveSections = [
    data.parentalLeave,
    data.familyCareLeave,
    flexibleHours,
    data.remoteWork,
  ];

  if (!hasAspectScores && leaveSections.every(isLeaveSectionEmpty)) {
    return (
      <NotFoundStatus>
        <EmptyView pageName={companyName} tabType={tabType} />
      </NotFoundStatus>
    );
  }

  return (
    <Section Tag="main" paddingBottom>
      {hasAspectScores && (
        <div className={styles.section}>
          <div className={styles.scoreRow}>
            <AspectScoreCard aspect={Aspect.WORK_LIFE_BALANCE} showEmptyState />
            <AspectScoreCard aspect={Aspect.GENDER} showEmptyState />
          </div>
        </div>
      )}
      <PolicySection
        className={styles.section}
        title="育嬰假(育嬰留職停薪)"
        icon={parentalLeaveIcon}
        availabilityTitle="是否請得到育嬰假?"
        availabilityBulletByLabel={PARENTAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL}
        complianceTitle="育嬰假法規符合度"
        complianceBulletByLabel={PARENTAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL}
        section={data.parentalLeave}
        linkTo={parentalLeaveLinkTo}
      />
      <PolicySection
        className={styles.section}
        title="家庭照顧假"
        icon={familyCareLeaveIcon}
        availabilityTitle="是否請得到家庭照顧假？"
        availabilityBulletByLabel={
          FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL
        }
        complianceTitle="家庭照顧假法規符合度"
        complianceBulletByLabel={FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL}
        section={data.familyCareLeave}
        linkTo={familyCareLeaveLinkTo}
      />
      <PolicySection
        className={styles.section}
        title="彈性上下班時間制度"
        icon={flexibleHoursIcon}
        availabilityTitle="是否有彈性上下班時間制度？"
        availabilityBulletByLabel={FLEXIBLE_HOURS_AVAILABILITY_BULLET_BY_LABEL}
        section={flexibleHours}
        linkTo={flexibleHoursLinkTo}
      />
      <PolicySection
        className={styles.section}
        title="遠端工作制度"
        icon={remoteWorkIcon}
        availabilityTitle="是否可以遠端工作？"
        availabilityBulletByLabel={REMOTE_WORK_AVAILABILITY_BULLET_BY_LABEL}
        complianceTitle="遠端工作每週天數？"
        complianceBulletByLabel={REMOTE_WORK_FREQUENCY_BULLET_BY_LABEL}
        section={data.remoteWork}
        linkTo={remoteWorkLinkTo}
      />
    </Section>
  );
};

export default FamilyChildcareSection;
