import React from 'react';

import { Heading, Section } from 'common/base';
import { Aspect } from 'constants/companyJobTitle';

import LeaveSectionBlock, { LeaveSection } from '../LeaveSectionBlock';
import FemaleManagerCard from './FemaleManagerCard';
import styles from './GenderFriendly.module.css';
import GenderPayComparisonBlock, {
  GenderPayComparisonData,
} from './GenderPayComparisonBlock';
import AspectScoreCard from '../Overview/AspectScoreCard';

export type GenderFriendlyData = {
  menstrualLeave: LeaveSection;
  genderPayComparison: GenderPayComparisonData;
};

type FemaleManagerItem = {
  year: number;
  percentage: number;
};

type GenderFriendlyProps = {
  data: GenderFriendlyData;
  femaleManagerStatisticsItem: FemaleManagerItem | null;
  menstrualLeaveLinkTo?: string;
};

const GenderFriendly: React.FC<GenderFriendlyProps> = ({
  data,
  femaleManagerStatisticsItem,
  menstrualLeaveLinkTo,
}) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        性別友善
      </Heading>
      <div className={styles.scoreRow}>
        <AspectScoreCard aspect={Aspect.GENDER} />
        {femaleManagerStatisticsItem && (
          <FemaleManagerCard item={femaleManagerStatisticsItem} />
        )}
      </div>
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        {data.menstrualLeave.title}
      </Heading>
      <LeaveSectionBlock
        section={data.menstrualLeave}
        linkTo={menstrualLeaveLinkTo}
      />
    </div>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        同職位男女薪資比較
      </Heading>
      <GenderPayComparisonBlock data={data.genderPayComparison} />
    </div>
  </Section>
);

export default GenderFriendly;
