import React from 'react';

import { Heading } from 'common/base';

import LeaveSectionBlock, {
  LeaveBulletByLabel,
  LeaveSection,
} from './LeaveSectionBlock';
import styles from './PolicySection.module.css';

type Props = {
  className?: string;
  title: string;
  icon?: string;
  availabilityTitle: string;
  availabilityBulletByLabel?: LeaveBulletByLabel;
  complianceTitle?: string;
  complianceBulletByLabel?: LeaveBulletByLabel;
  section: LeaveSection;
  linkTo?: string;
};

const PolicySection: React.FC<Props> = ({
  className,
  title,
  ...leaveSectionBlockProps
}) => (
  <div className={className}>
    <Heading className={styles.sectionTitle} Tag="h2">
      {title}
    </Heading>
    <LeaveSectionBlock title={title} {...leaveSectionBlockProps} />
  </div>
);

export default PolicySection;
