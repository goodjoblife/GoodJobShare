import React from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { Heading, Section } from 'common/base';
import { generateSharePolicyForm } from 'common/ShareExpSection/shareLinkTo';
import { Aspect } from 'constants/companyJobTitle';

import { LeaveSection } from '../LeaveSectionBlock';
import menstrualLeaveIcon from '../menstrualLeaveIcon.svg';
import styles from './GenderFriendly.module.css';
import AspectScoreCard from '../AspectScoreCard';
import {
  menstrualLeaveAvailabilityBulletByLabel,
  menstrualLeaveComplianceBulletByLabel,
} from '../policyBulletByLabel';
import PolicySection from '../PolicySection';
import { EsgItemBlock } from '../SalaryWorkTime/EsgBlock/EsgBlock';

export type GenderFriendlyData = {
  menstrualLeave: LeaveSection;
};

export type FemaleManagerItem = ESGSalaryData['femaleManagerStatistics'][number];

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
      linkTo={menstrualLeaveLinkTo}
    />
  </Section>
);

export default GenderFriendly;
