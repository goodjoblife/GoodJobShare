import { generatePath } from 'react-router';

enum PageType {
  JOB_TITLE = 'JOB_TITLE',
  COMPANY = 'COMPANY',
}

const pageType = PageType;

export { pageType, PageType };

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

const tabType = TabType;

export { tabType, TabType };

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

export enum Aspect {
  GENDER = '性別友善度',
  WORK_LIFE_BALANCE = '工作與生活平衡',
  COMPENSATION = '薪資福利',
  JOB_CONTENT = '工作內容',
  WORK_TIME = '工時狀況',
  CULTURE = '公司/團隊文化',
  MANAGEMENT = '公司管理方式',
  GROWTH = '獲得的成長',
  PROMOTION = '升遷制度',
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

export const generateIndexURL = ({
  pageType,
}: {
  pageType: PageType;
}): string =>
  generatePath('/:pageTypeURL', {
    pageTypeURL: pageTypeURLMap[pageType],
  });

export const PAGE_SIZE = 10;
