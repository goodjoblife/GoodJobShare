import React from 'react';

import { Heading, Section } from 'common/base';
import { Aspect } from 'constants/companyJobTitle';

import LeaveSectionBlock, { LeaveSection } from '../LeaveSectionBlock';
import AspectScoreCard from '../Overview/AspectScoreCard';
import PolicyBarChart, { PolicyDistribution } from '../PolicyBarChart';
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
        section={data.parentalLeave}
      />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        家庭照顧假
      </Heading>
      <LeaveSectionBlock title="家庭照顧假" section={data.familyCareLeave} />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        彈性上下班時間制度
      </Heading>
      <div className={styles.scoreRow}>
        <PolicyBarChart distribution={data.flexibleHours} />
      </div>
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        遠端工作制度
      </Heading>
      <LeaveSectionBlock title="遠端工作制度" section={data.remoteWork} />
    </div>
  </Section>
);

export default FamilyChildcareSection;
