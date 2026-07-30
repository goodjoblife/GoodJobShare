import React from 'react';

import { Heading, Section } from 'common/base';
import { Aspect } from 'constants/companyJobTitle';

import familyCareLeaveIcon from '../familyCareLeaveIcon.svg';
import LeaveSectionBlock, {
  BulletByLabel,
  LeaveSection,
} from '../LeaveSectionBlock';
import AspectScoreCard from '../Overview/AspectScoreCard';
import parentalLeaveIcon from '../parentalLeaveIcon.svg';
import PolicyBarChart, { PolicyDistribution } from '../PolicyBarChart';
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
};

const parentalLeaveAvailabilityBulletByLabel: BulletByLabel = {
  是: count => ({ text: `請得到育嬰假 (${count}筆)`, icon: 'like' }),
  否: count => `請不到育嬰假 (${count}筆)`,
  不知道: count => `不確定是否請得到育嬰假 (${count}筆)`,
};

const parentalLeaveComplianceBulletByLabel: BulletByLabel = {
  符合勞基法: count => ({
    text: `育嬰假符合勞基法 (${count}筆)`,
    icon: 'like',
  }),
  優於勞基法: count => ({
    text: `育嬰假優於勞基法 (${count}筆)`,
    icon: 'like',
  }),
  不符合勞基法: count => `育嬰假不符合勞基法 (${count}筆)`,
  不知道: count => `不確定育嬰假是否符合勞基法 (${count}筆)`,
};

const familyCareLeaveAvailabilityBulletByLabel: BulletByLabel = {
  是: count => ({ text: `請得到家庭照顧假 (${count}筆)`, icon: 'like' }),
  否: count => `請不到家庭照顧假 (${count}筆)`,
  不知道: count => `不確定是否請得到家庭照顧假 (${count}筆)`,
};

const familyCareLeaveComplianceBulletByLabel: BulletByLabel = {
  符合勞基法: count => ({
    text: `家庭照顧假符合勞基法 (${count}筆)`,
    icon: 'like',
  }),
  優於勞基法: count => ({
    text: `家庭照顧假優於勞基法 (${count}筆)`,
    icon: 'like',
  }),
  不符合勞基法: count => `家庭照顧假不符合勞基法 (${count}筆)`,
  不知道: count => `不確定家庭照顧假是否符合勞基法 (${count}筆)`,
};

const remoteWorkAvailabilityBulletByLabel: BulletByLabel = {
  是: count => `有遠端工作制度 (${count}筆)`,
  否: count => `無遠端工作制度 (${count}筆)`,
  不知道: count => `不確定是否有遠端工作制度 (${count}筆)`,
};

const remoteWorkFrequencyBulletByLabel: BulletByLabel = {
  '1天': count => `每週遠端工作 1 天 (${count}筆)`,
  '2天': count => `每週遠端工作 2 天 (${count}筆)`,
  '3天': count => `每週遠端工作 3 天 (${count}筆)`,
  大於3天: count => `每週遠端工作超過 3 天 (${count}筆)`,
};

const FamilyChildcareSection: React.FC<Props> = ({ data }) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.section}>
      <div className={styles.scoreRow}>
        <AspectScoreCard aspect={Aspect.WORK_LIFE_BALANCE} hasEmptyState />
        <AspectScoreCard aspect={Aspect.GENDER} hasEmptyState />
      </div>
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        育嬰假(育嬰留職停薪)
      </Heading>
      <LeaveSectionBlock
        title="育嬰假(育嬰留職停薪)"
        icon={parentalLeaveIcon}
        availabilityTitle="是否請得到育嬰假?"
        availabilityBulletByLabel={parentalLeaveAvailabilityBulletByLabel}
        complianceTitle="育嬰假法規符合度"
        complianceBulletByLabel={parentalLeaveComplianceBulletByLabel}
        section={data.parentalLeave}
      />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        家庭照顧假
      </Heading>
      <LeaveSectionBlock
        title="家庭照顧假"
        icon={familyCareLeaveIcon}
        availabilityTitle="是否請得到家庭照顧假？"
        availabilityBulletByLabel={familyCareLeaveAvailabilityBulletByLabel}
        complianceTitle="家庭照顧假法規符合度"
        complianceBulletByLabel={familyCareLeaveComplianceBulletByLabel}
        section={data.familyCareLeave}
      />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        彈性上下班時間制度
      </Heading>
      <div className={styles.scoreRow}>
        <PolicyBarChart
          title="是否有彈性上下班時間制度？"
          distribution={data.flexibleHours}
        />
      </div>
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        遠端工作制度
      </Heading>
      <LeaveSectionBlock
        title="遠端工作制度"
        icon={remoteWorkIcon}
        availabilityTitle="是否可以遠端工作？"
        availabilityBulletByLabel={remoteWorkAvailabilityBulletByLabel}
        complianceTitle="遠端工作每週天數？"
        complianceBulletByLabel={remoteWorkFrequencyBulletByLabel}
        section={data.remoteWork}
      />
    </div>
  </Section>
);

export default FamilyChildcareSection;
