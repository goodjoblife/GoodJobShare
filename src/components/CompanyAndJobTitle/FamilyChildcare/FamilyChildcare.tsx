import React from 'react';

import { Heading, Section } from 'common/base';
import { Aspect } from 'constants/companyJobTitle';

import LeaveSectionBlock, { LeaveSection } from '../LeaveSectionBlock';
import AspectScoreCard from '../Overview/AspectScoreCard';
import PolicyBarChart, { PolicyDistribution } from '../PolicyBarChart';
import styles from './FamilyChildcare.module.css';

export type FamilyChildcareData = {
  parentalLeave: LeaveSection;
  familyCareLeave: LeaveSection;
  flexibleHours: PolicyDistribution;
  remoteWork: LeaveSection;
};

type Props = {
  data: FamilyChildcareData;
};

const FamilyChildcare: React.FC<Props> = ({ data }) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        家庭/育兒
      </Heading>
      <div className={styles.scoreRow}>
        <AspectScoreCard aspect={Aspect.WORK_LIFE_BALANCE} />
        <AspectScoreCard aspect={Aspect.GENDER} />
      </div>
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        {data.parentalLeave.title}
      </Heading>
      <LeaveSectionBlock section={data.parentalLeave} />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        {data.familyCareLeave.title}
      </Heading>
      <LeaveSectionBlock section={data.familyCareLeave} />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        彈性上下班時間制度
      </Heading>
      <PolicyBarChart distribution={data.flexibleHours} />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        {data.remoteWork.title}
      </Heading>
      <LeaveSectionBlock section={data.remoteWork} />
    </div>
  </Section>
);

export default FamilyChildcare;
