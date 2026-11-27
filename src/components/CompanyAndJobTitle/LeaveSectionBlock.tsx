import React from 'react';

import styles from './LeaveSectionBlock.module.css';
import PolicyChartCard from './PolicyChartCard';
import PolicySummaryCard from './PolicySummaryCard';
import { LeaveBulletByLabel, LeaveSection } from './policyTypes';

type LeaveSectionBlockProps = {
  title: string;
  icon?: string;
  availabilityTitle: string;
  availabilityBulletByLabel?: LeaveBulletByLabel;
  complianceTitle?: string;
  complianceBulletByLabel?: LeaveBulletByLabel;
  section: LeaveSection;
  linkTo?: string;
};

const LeaveSectionBlock: React.FC<LeaveSectionBlockProps> = ({
  title,
  icon,
  availabilityTitle,
  availabilityBulletByLabel,
  complianceTitle,
  complianceBulletByLabel,
  section,
  linkTo,
}) => (
  <div className={styles.row}>
    {availabilityBulletByLabel && (
      <PolicySummaryCard
        title={title}
        icon={icon}
        availabilityBulletByLabel={availabilityBulletByLabel}
        complianceBulletByLabel={complianceBulletByLabel}
        section={section}
        linkTo={linkTo}
      />
    )}
    <PolicyChartCard
      title={availabilityTitle}
      distribution={section.availability}
      linkTo={linkTo}
    />
    {section.compliance && complianceTitle && (
      <PolicyChartCard
        title={complianceTitle}
        distribution={section.compliance}
        linkTo={linkTo}
      />
    )}
  </div>
);

export default LeaveSectionBlock;
