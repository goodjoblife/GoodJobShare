import React from 'react';
import Card from 'common/Card';
import { Link } from 'common/base';
import PolicyBarChart, { PolicyDistribution } from './PolicyBarChart';
import styles from './LeaveSectionBlock.module.css';

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
    <PolicyBarChart distribution={section.availability} />
    {section.compliance && <PolicyBarChart distribution={section.compliance} />}
  </div>
);

export default LeaveSectionBlock;
