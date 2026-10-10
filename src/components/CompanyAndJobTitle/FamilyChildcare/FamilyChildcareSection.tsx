import React from 'react';

import { Section } from 'common/base';
import { generateSharePolicyForm } from 'common/ShareExpSection/shareLinkTo';
import { Aspect } from 'constants/companyJobTitle';

import AspectScoreCard from '../AspectScoreCard';
import {
  FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  PARENTAL_LEAVE_AVAILABILITY_BULLET_BY_LABEL,
  PARENTAL_LEAVE_COMPLIANCE_BULLET_BY_LABEL,
  REMOTE_WORK_AVAILABILITY_BULLET_BY_LABEL,
  REMOTE_WORK_FREQUENCY_BULLET_BY_LABEL,
} from '../constants';
import familyCareLeaveIcon from '../familyCareLeaveIcon.svg';
import { LeaveSection } from '../LeaveSectionBlock';
import parentalLeaveIcon from '../parentalLeaveIcon.svg';
import { PolicyDistribution } from '../PolicyBarChart';
import PolicySection from '../PolicySection';
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

const FamilyChildcareSection: React.FC<Props> = ({
  data,
  parentalLeaveLinkTo,
  familyCareLeaveLinkTo,
  flexibleHoursLinkTo,
  remoteWorkLinkTo,
}) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.section}>
      <div className={styles.scoreRow}>
        <AspectScoreCard
          aspect={Aspect.WORK_LIFE_BALANCE}
          emptyShareLinkTo={generateSharePolicyForm()}
        />
        <AspectScoreCard
          aspect={Aspect.GENDER}
          emptyShareLinkTo={generateSharePolicyForm()}
        />
      </div>
    </div>
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
      availabilityBulletByLabel={FAMILY_CARE_LEAVE_AVAILABILITY_BULLET_BY_LABEL}
      complianceTitle="家庭照顧假法規符合度"
      complianceBulletByLabel={FAMILY_CARE_LEAVE_COMPLIANCE_BULLET_BY_LABEL}
      section={data.familyCareLeave}
      linkTo={familyCareLeaveLinkTo}
    />
    <PolicySection
      className={styles.section}
      title="彈性上下班時間制度"
      availabilityTitle="是否有彈性上下班時間制度？"
      section={{
        dataCount: data.flexibleHours.dataCount,
        availability: data.flexibleHours,
      }}
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

export default FamilyChildcareSection;
