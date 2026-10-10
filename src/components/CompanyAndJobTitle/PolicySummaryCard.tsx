import cn from 'classnames';
import React from 'react';

import { Link } from 'common/base';
import Card from 'common/Card';

import {
  LeaveBulletByLabel,
  LeaveSection,
  SummaryBullet,
} from './LeaveSectionBlock';
import { PolicyDistribution } from './PolicyBarChart';
import styles from './PolicySummaryCard.module.css';

type Props = {
  className?: string;
  title: string;
  icon?: string;
  availabilityBulletByLabel: LeaveBulletByLabel;
  complianceBulletByLabel?: LeaveBulletByLabel;
  section: LeaveSection;
  linkTo?: string;
};

const majorityBullet = (
  distribution: PolicyDistribution,
  bulletByLabel: LeaveBulletByLabel,
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

const PolicySummaryCard: React.FC<Props> = ({
  className,
  title,
  icon,
  availabilityBulletByLabel,
  complianceBulletByLabel,
  section,
  linkTo,
}) => {
  const summaryBullets: SummaryBullet[] = [
    majorityBullet(section.availability, availabilityBulletByLabel),
  ];

  if (section.compliance && complianceBulletByLabel) {
    summaryBullets.push(
      majorityBullet(section.compliance, complianceBulletByLabel),
    );
  }

  return (
    <Card className={cn(styles.card, className)}>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      <div className={styles.title}>{title}</div>
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
  );
};

export default PolicySummaryCard;
