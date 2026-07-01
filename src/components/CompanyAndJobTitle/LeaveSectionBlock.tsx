import React from 'react';

import { Link } from 'common/base';
import Card from 'common/Card';

import styles from './LeaveSectionBlock.module.css';
import PolicyBarChart, { PolicyDistribution } from './PolicyBarChart';

export type LeaveSection = {
  title: string;
  summaryBullets: string[];
  dataCount: number;
  availability: PolicyDistribution;
  compliance?: PolicyDistribution;
};

type LeaveSectionBlockProps = {
  section: LeaveSection;
  linkTo?: string;
};

const LeaveSectionBlock: React.FC<LeaveSectionBlockProps> = ({
  section,
  linkTo,
}) => (
  <div className={styles.row}>
    <Card className={styles.summaryCard}>
      <div className={styles.summaryTitle}>{section.title}</div>
      <ul className={styles.bullets}>
        {section.summaryBullets.map(bullet => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {linkTo && (
        <Link to={linkTo} className={styles.link}>
          查看 {section.dataCount} 筆資料 &gt;&gt;
        </Link>
      )}
    </Card>
    <PolicyBarChart distribution={section.availability} linkTo={linkTo} />
    {section.compliance && (
      <PolicyBarChart distribution={section.compliance} linkTo={linkTo} />
    )}
  </div>
);

export default LeaveSectionBlock;
