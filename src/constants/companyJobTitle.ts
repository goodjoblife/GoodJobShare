import { generatePath } from 'react-router';

import { companyWorkExperiencesAspectPath } from './linkTo';

enum PageType {
  JOB_TITLE = 'JOB_TITLE',
  COMPANY = 'COMPANY',
}

export { PageType };

export const pageTypeTranslation: Record<PageType, string> = {
  [PageType.JOB_TITLE]: '職稱',
  [PageType.COMPANY]: '公司',
};

const pageTypeURLMap: Record<PageType, string> = {
  [PageType.JOB_TITLE]: 'job-titles',
  [PageType.COMPANY]: 'companies',
};

enum TabType {
  OVERVIEW = 'OVERVIEW',
  TIME_AND_SALARY = 'TIME_AND_SALARY',
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
  INTERVIEW_EXPERIENCE = 'INTERVIEW_EXPERIENCE',
}

export { TabType };

export const tabTypeTranslation: Record<TabType, string> = {
  [TabType.OVERVIEW]: '總覽',
  [TabType.TIME_AND_SALARY]: '薪水&加班',
  [TabType.WORK_EXPERIENCE]: '評價',
  [TabType.INTERVIEW_EXPERIENCE]: '面試',
};

export const tabTypeDetailTranslation: Record<TabType, string> = {
  [TabType.OVERVIEW]: '總覽',
  [TabType.TIME_AND_SALARY]: '薪水&加班狀況',
  [TabType.WORK_EXPERIENCE]: '評價',
  [TabType.INTERVIEW_EXPERIENCE]: '面試經驗',
};

const tabTypeURLMap: Record<TabType, string> = {
  [TabType.OVERVIEW]: 'overview',
  [TabType.TIME_AND_SALARY]: 'salary-work-times',
  [TabType.WORK_EXPERIENCE]: 'work-experiences',
  [TabType.INTERVIEW_EXPERIENCE]: 'interview-experiences',
};

// 值是內部識別，不對外。顯示、URL、API 三個用途各自查表，見下方三張 map
export enum Aspect {
  GENDER = 'GENDER',
  WORK_LIFE_BALANCE = 'WORK_LIFE_BALANCE',
  COMPENSATION = 'COMPENSATION',
  JOB_CONTENT = 'JOB_CONTENT',
  WORK_TIME = 'WORK_TIME',
  CULTURE = 'CULTURE',
  MANAGEMENT = 'MANAGEMENT',
  GROWTH = 'GROWTH',
  PROMOTION = 'PROMOTION',
}

export const Aspects = [
  Aspect.GENDER,
  Aspect.WORK_LIFE_BALANCE,
  Aspect.COMPENSATION,
  Aspect.JOB_CONTENT,
  Aspect.WORK_TIME,
  Aspect.CULTURE,
  Aspect.MANAGEMENT,
  Aspect.GROWTH,
  Aspect.PROMOTION,
];

// Aspect 的三個身分各自一張表。aspectTranslation 與 aspectAPIMap 目前內容
// 相同，但不要合併 —— 同值是巧合，分開才能各自演進（改文案不會動到 wire 值）
export const aspectTranslation: Record<Aspect, string> = {
  [Aspect.GENDER]: '性別友善度',
  [Aspect.WORK_LIFE_BALANCE]: '工作與生活平衡',
  [Aspect.COMPENSATION]: '薪資福利',
  [Aspect.JOB_CONTENT]: '工作內容',
  [Aspect.WORK_TIME]: '工時狀況',
  [Aspect.CULTURE]: '公司/團隊文化',
  [Aspect.MANAGEMENT]: '公司管理方式',
  [Aspect.GROWTH]: '獲得的成長',
  [Aspect.PROMOTION]: '升遷制度',
};

const aspectURLMap: Record<Aspect, string> = {
  [Aspect.GENDER]: 'gender-friendly',
  [Aspect.WORK_LIFE_BALANCE]: 'work-life-balance',
  [Aspect.COMPENSATION]: 'compensation',
  [Aspect.JOB_CONTENT]: 'job-content',
  [Aspect.WORK_TIME]: 'work-time',
  [Aspect.CULTURE]: 'culture',
  [Aspect.MANAGEMENT]: 'management',
  [Aspect.GROWTH]: 'growth',
  [Aspect.PROMOTION]: 'promotion',
};

// 送給後端與後端回傳的值。維持中文，後端不需配合改動
const aspectAPIMap: Record<Aspect, string> = {
  [Aspect.GENDER]: '性別友善度',
  [Aspect.WORK_LIFE_BALANCE]: '工作與生活平衡',
  [Aspect.COMPENSATION]: '薪資福利',
  [Aspect.JOB_CONTENT]: '工作內容',
  [Aspect.WORK_TIME]: '工時狀況',
  [Aspect.CULTURE]: '公司/團隊文化',
  [Aspect.MANAGEMENT]: '公司管理方式',
  [Aspect.GROWTH]: '獲得的成長',
  [Aspect.PROMOTION]: '升遷制度',
};

const invert = (map: Record<Aspect, string>): Record<string, Aspect> =>
  Object.entries(map).reduce(
    (acc, [aspect, value]) => ({ ...acc, [value]: aspect as Aspect }),
    {},
  );

const aspectByURL = invert(aspectURLMap);
const aspectByAPIValue = invert(aspectAPIMap);

export const aspectToAPIValue = (aspect: Aspect): string =>
  aspectAPIMap[aspect];

// 網址上的值由使用者輸入，查不到是合法情況（拼錯、舊網址），
// 由呼叫端決定要 redirect 還是 NotFound
export const aspectFromURL = (slug: string): Aspect | undefined =>
  aspectByURL[slug];

// 後端回傳未知的 aspect 時捨棄該筆，不讓未知字串冒充 Aspect
export const aspectFromAPIValue = (value: string): Aspect | undefined =>
  aspectByAPIValue[value];

export const generatePageURL = ({
  pageName,
  pageType,
}: {
  pageType: PageType;
  pageName: string;
}): string =>
  generatePath('/:pageTypeURL/:pageName', {
    pageTypeURL: pageTypeURLMap[pageType],
    pageName,
  });

export const generateTabURL = ({
  pageType,
  pageName,
  tabType,
}: {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}): string => {
  if (tabType === TabType.OVERVIEW) {
    return generatePageURL({ pageType, pageName });
  }
  return generatePath('/:pageTypeURL/:pageName/:tabTypeURL', {
    pageTypeURL: pageTypeURLMap[pageType],
    pageName,
    tabTypeURL: tabTypeURLMap[tabType],
  });
};

export const generateAspectURL = ({
  pageName,
  aspect,
}: {
  pageName: string;
  aspect: Aspect;
}): string =>
  generatePath(companyWorkExperiencesAspectPath, {
    companyName: pageName,
    aspect: aspectURLMap[aspect],
  });

export const generateIndexURL = ({
  pageType,
}: {
  pageType: PageType;
}): string =>
  generatePath('/:pageTypeURL', {
    pageTypeURL: pageTypeURLMap[pageType],
  });

export const PAGE_SIZE = 10;
