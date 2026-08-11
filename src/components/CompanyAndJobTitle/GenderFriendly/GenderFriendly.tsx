import React from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { Heading, Section } from 'common/base';
import Glike from 'common/icons/Glike';
import { generateSharePolicyForm } from 'common/ShareExpSection/shareLinkTo';
import { Aspect } from 'constants/companyJobTitle';

import { LeaveBulletByLabel, LeaveSection } from '../LeaveSectionBlock';
import menstrualLeaveIcon from '../menstrualLeaveIcon.svg';
import styles from './GenderFriendly.module.css';
import GenderPayComparisonCard, {
  GenderPayComparisonData,
} from './GenderPayComparisonCard';
import AspectScoreCard from '../AspectScoreCard';
import PolicySection from '../PolicySection';
import { EsgItemBlock } from '../SalaryWorkTime/EsgBlock/EsgBlock';

export type GenderFriendlyData = {
  menstrualLeave: LeaveSection;
  genderPayComparison: GenderPayComparisonData;
};

export type FemaleManagerItem = ESGSalaryData['femaleManagerStatistics'][number];

type GenderFriendlyProps = {
  data: GenderFriendlyData;
  femaleManagerStatisticsItem: FemaleManagerItem | null;
};

const menstrualLeaveAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: { text: '請得到生理假', icon: <Glike /> },
  否: '請不到生理假',
  不知道: '不確定是否請得到生理假',
};

const menstrualLeaveComplianceBulletByLabel: LeaveBulletByLabel = {
  符合勞基法: { text: '生理假符合勞基法', icon: <Glike /> },
  優於勞基法: { text: '生理假優於勞基法', icon: <Glike /> },
  不符合勞基法: '生理假不符合勞基法',
  不知道: '不確定生理假是否符合勞基法',
};

const GenderFriendly: React.FC<GenderFriendlyProps> = ({
  data,
  femaleManagerStatisticsItem,
}) => (
  <Section Tag="main" paddingBottom>
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        性別友善
      </Heading>
      <div className={styles.scoreRow}>
        <AspectScoreCard
          aspect={Aspect.GENDER}
          emptyShareLinkTo={generateSharePolicyForm()}
        />
        {femaleManagerStatisticsItem && (
          <EsgItemBlock
            className={styles.femaleManagerCard}
            title="管理職女性主管佔比"
            year={femaleManagerStatisticsItem.year}
            value={femaleManagerStatisticsItem.percentage * 100}
            unit="%"
          />
        )}
      </div>
    </div>
    <PolicySection
      className={styles.section}
      title="生理假"
      icon={menstrualLeaveIcon}
      availabilityTitle="是否請得到生理假"
      availabilityBulletByLabel={menstrualLeaveAvailabilityBulletByLabel}
      complianceTitle="生理假法規符合度"
      complianceBulletByLabel={menstrualLeaveComplianceBulletByLabel}
      section={data.menstrualLeave}
    />
    <div className={styles.section}>
      <Heading className={styles.sectionTitle} Tag="h2">
        同職位男女薪資比較
      </Heading>
      <GenderPayComparisonCard data={data.genderPayComparison} />
    </div>
  </Section>
);

export default GenderFriendly;
