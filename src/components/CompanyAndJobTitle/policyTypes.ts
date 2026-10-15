import React from 'react';

export type PolicyItem = {
  label: string;
  percentage: number;
};

export type PolicyDistribution = {
  dataCount: number;
  items: PolicyItem[];
};

type SummaryBulletIcon = React.ReactElement<{ className?: string }> | null;
export type SummaryBullet = { text: string; icon: SummaryBulletIcon };

export type LeaveBullet = string | SummaryBullet;
export type LeaveBulletByLabel = Record<string, LeaveBullet>;

export type LeaveSection = {
  dataCount: number;
  availability: PolicyDistribution;
  compliance?: PolicyDistribution;
};
