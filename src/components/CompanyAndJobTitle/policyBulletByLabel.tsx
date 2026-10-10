import React from 'react';

import Glike from 'common/icons/Glike';

import { LeaveBulletByLabel } from './LeaveSectionBlock';

export const parentalLeaveAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: { text: '請得到育嬰假', icon: <Glike /> },
  否: '請不到育嬰假',
  不知道: '不確定是否請得到育嬰假',
};

export const parentalLeaveComplianceBulletByLabel: LeaveBulletByLabel = {
  符合勞基法: { text: '育嬰假符合勞基法', icon: <Glike /> },
  優於勞基法: { text: '育嬰假優於勞基法', icon: <Glike /> },
  不符合勞基法: '育嬰假不符合勞基法',
  不知道: '不確定育嬰假是否符合勞基法',
};

export const familyCareLeaveAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: { text: '請得到家庭照顧假', icon: <Glike /> },
  否: '請不到家庭照顧假',
  不知道: '不確定是否請得到家庭照顧假',
};

export const familyCareLeaveComplianceBulletByLabel: LeaveBulletByLabel = {
  符合勞基法: { text: '家庭照顧假符合勞基法', icon: <Glike /> },
  優於勞基法: { text: '家庭照顧假優於勞基法', icon: <Glike /> },
  不符合勞基法: '家庭照顧假不符合勞基法',
  不知道: '不確定家庭照顧假是否符合勞基法',
};

export const flexibleHoursAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: '有彈性上下班時間制度',
  否: '無彈性上下班時間制度',
  不知道: '不確定是否有彈性上下班時間制度',
};

export const remoteWorkAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: '有遠端工作制度',
  否: '無遠端工作制度',
  不知道: '不確定是否有遠端工作制度',
};

export const remoteWorkFrequencyBulletByLabel: LeaveBulletByLabel = {
  '1天': '每週遠端工作 1 天',
  '2天': '每週遠端工作 2 天',
  '3天': '每週遠端工作 3 天',
  大於3天: '每週遠端工作超過 3 天',
};

export const menstrualLeaveAvailabilityBulletByLabel: LeaveBulletByLabel = {
  是: { text: '請得到生理假', icon: <Glike /> },
  否: '請不到生理假',
  不知道: '不確定是否請得到生理假',
};

export const menstrualLeaveComplianceBulletByLabel: LeaveBulletByLabel = {
  符合勞基法: { text: '生理假符合勞基法', icon: <Glike /> },
  優於勞基法: { text: '生理假優於勞基法', icon: <Glike /> },
  不符合勞基法: '生理假不符合勞基法',
  不知道: '不確定生理假是否符合勞基法',
};
