import React from 'react';

import { Link } from 'common/base';
import Card from 'common/Card';
import Glike from 'common/icons/Glike';

import styles from './LeaveSectionBlock.module.css';
import PolicyBarChart, { PolicyDistribution } from './PolicyBarChart';

export type LeaveBullet = string | { text: string; icon: 'like' };

export type BulletByLabel = Record<string, (count: number) => LeaveBullet>;

export type LeaveSection = {
  icon?: string;
  dataCount: number;
  availability: PolicyDistribution;
  compliance?: PolicyDistribution;
};

type LeaveSectionBlockProps = {
  title: string;
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
): LeaveBullet => {
  const majority = distribution.items.reduce((max, item) =>
    item.percentage > max.percentage ? item : max,
  );
  const count = Math.round(
    (distribution.dataCount * majority.percentage) / 100,
  );
  return bulletByLabel[majority.label](count);
};

const LeaveSectionBlock: React.FC<LeaveSectionBlockProps> = ({
  title,
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
        {section.icon && (
          <img className={styles.icon} src={section.icon} alt="" />
        )}
        <div className={styles.summaryTitle}>{title}</div>
        <ul className={styles.bullets}>
          {summaryBullets.map(bullet => {
            const text = typeof bullet === 'string' ? bullet : bullet.text;
            const hasLikeIcon =
              typeof bullet !== 'string' && bullet.icon === 'like';
            return (
              <li key={text}>
                {hasLikeIcon ? (
                  <Glike className={styles.likeIcon} />
                ) : (
                  <span className={styles.dash}>–</span>
                )}
                {text}
              </li>
            );
          })}
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
