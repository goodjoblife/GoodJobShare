import React from 'react';

import { Link } from 'common/base';
import Card from 'common/Card';

import styles from './LeaveSectionBlock.module.css';
import PolicyBarChart, { PolicyDistribution } from './PolicyBarChart';

type SummaryBulletIcon = React.ReactElement<{ className?: string }> | null;

type SummaryBullet = { text: string; icon: SummaryBulletIcon };

export type LeaveBullet = string | SummaryBullet;

export type BulletByLabel = Record<string, LeaveBullet>;

export type LeaveSection = {
  dataCount: number;
  availability: PolicyDistribution;
  compliance?: PolicyDistribution;
};

type LeaveSectionBlockProps = {
  title: string;
  icon?: string;
  availabilityTitle: string;
  availabilityBulletByLabel: BulletByLabel;
  complianceTitle?: string;
  complianceBulletByLabel?: BulletByLabel;
  section: LeaveSection;
  linkTo?: string;
};

const majorityBullet = (
  distribution: PolicyDistribution,
  bulletByLabel: BulletByLabel,
): SummaryBullet => {
  const majority = distribution.items.reduce((max, item) =>
    item.percentage > max.percentage ? item : max,
  );
  const count = Math.round(
    (distribution.dataCount * majority.percentage) / 100,
  );
  const bullet = bulletByLabel[majority.label];
  const text = typeof bullet === 'string' ? bullet : bullet.text;
  const icon = typeof bullet === 'string' ? null : bullet.icon;
  return { text: `${text} (${count}筆)`, icon };
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
}) => {
  const summaryBullets = [
    majorityBullet(section.availability, availabilityBulletByLabel),
    ...(section.compliance && complianceBulletByLabel
      ? [majorityBullet(section.compliance, complianceBulletByLabel)]
      : []),
  ];

  return (
    <div className={styles.row}>
      <Card className={styles.summaryCard}>
        {icon && <img className={styles.icon} src={icon} alt="" />}
        <div className={styles.summaryTitle}>{title}</div>
        <ul className={styles.bullets}>
          {summaryBullets.map(({ text, icon }) => (
            <li key={text}>
              {icon ? (
                React.cloneElement(icon, { className: styles.likeIcon })
              ) : (
                <span className={styles.dash}>–</span>
              )}
              {text}
            </li>
          ))}
        </ul>
        {linkTo && (
          <Link to={linkTo} className={styles.link}>
            查看 {section.dataCount} 筆資料 &gt;&gt;
          </Link>
        )}
      </Card>
      <PolicyBarChart
        title={availabilityTitle}
        distribution={section.availability}
        linkTo={linkTo}
      />
      {section.compliance && complianceTitle && (
        <PolicyBarChart
          title={complianceTitle}
          distribution={section.compliance}
          linkTo={linkTo}
        />
      )}
    </div>
  );
};

export default LeaveSectionBlock;
