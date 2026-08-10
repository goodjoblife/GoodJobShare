import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import { generatePageURL, PageType } from 'constants/companyJobTitle';
import { SITE_NAME } from 'constants/helmetData';
import {
  companyRatingStatisticsBoxSelectorByName,
  companyTopNJobTitlesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';
import { formatCanonicalPath, formatTitle } from 'utils/helmetHelper';

import EmployerAggregateRatingSeo from './EmployerAggregateRatingSeo';

// if length of given array > 0, return `${array length}${unit}`
// otherwise return defaultStr
const formatDataCount = (
  dataCount: number,
  unit: string,
  defaultStr: string,
): string => {
  if (dataCount > 0) {
    return `${dataCount}${unit}`;
  } else {
    return defaultStr;
  }
};

const formatKeyword = (name: string): string =>
  `${name}薪水, ${name}加班情況, ${name}工時, ${name}評價, ${name}面試心得`;

type CompanyOverviewHelmetProps = {
  companyName: string;
  salaryWorkTimesCount: number;
  interviewExperiencesCount: number;
  workExperiencesCount: number;
};

export const CompanyOverviewHelmet: React.FC<CompanyOverviewHelmetProps> = ({
  companyName,
  salaryWorkTimesCount,
  interviewExperiencesCount,
  workExperiencesCount,
}) => {
  const ratingStatistcsBox = useSelector(
    companyRatingStatisticsBoxSelectorByName(companyName),
  );
  const topNJobTitlesBox = useSelector(
    companyTopNJobTitlesBoxSelectorByName(companyName),
  );
  const topNJobTitles = topNJobTitlesBox.data ? topNJobTitlesBox.data.all : [];

  const title = companyName;

  const salaryWorkTimesStr =
    salaryWorkTimesCount > 0 ? `${salaryWorkTimesCount}筆薪水、加班狀況` : '';
  const interviewExperiencesStr =
    interviewExperiencesCount > 0
      ? `${interviewExperiencesCount}篇面試心得`
      : '';
  const workExperiencesStr =
    workExperiencesCount > 0 ? `${workExperiencesCount}篇評價` : '';
  const combinedStr = [
    salaryWorkTimesStr,
    interviewExperiencesStr,
    workExperiencesStr,
  ]
    .filter(Boolean)
    .join('、');
  const jobTitles = topNJobTitles.map(item => item.name).join('、');
  const description = `想了解${companyName}嗎？由內部員工分享${jobTitles}等職位的${combinedStr}，幫助你更瞭解${companyName}！`;

  const path = generatePageURL({
    pageType: PageType.COMPANY,
    pageName: companyName,
  });
  const url = formatCanonicalPath(path);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={formatKeyword(companyName)} />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
      </Helmet>
      {isFetched(ratingStatistcsBox) && ratingStatistcsBox.data && (
        <EmployerAggregateRatingSeo
          title={formatTitle(title, SITE_NAME)}
          description={description}
          companyName={companyName}
          averageRating={ratingStatistcsBox.data.averageRating}
          ratingCount={ratingStatistcsBox.data.ratingCount}
        />
      )}
    </>
  );
};

type JobTitleOverviewHelmetProps = {
  jobTitle: string;
  salaryWorkTimesCount: number;
  interviewExperiencesCount: number;
  workExperiencesCount: number;
};

export const JobTitleOverviewHelmet: React.FC<JobTitleOverviewHelmetProps> = ({
  jobTitle,
  salaryWorkTimesCount,
  interviewExperiencesCount,
  workExperiencesCount,
}) => {
  const title = `${jobTitle} 總覽`;

  const salaryWorkTimesStr = formatDataCount(salaryWorkTimesCount, '筆', '');
  const interviewExperiencesStr = formatDataCount(
    interviewExperiencesCount,
    '篇',
    '',
  );
  const workExperiencesStr = formatDataCount(workExperiencesCount, '篇', '');
  const description = `查看由${jobTitle}分享的${salaryWorkTimesStr}薪水及加班數據、${workExperiencesStr}評價，以及由面試者分享的${interviewExperiencesStr}面試經驗。`;

  const path = generatePageURL({
    pageType: PageType.JOB_TITLE,
    pageName: jobTitle,
  });
  const url = formatCanonicalPath(path);

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={formatKeyword(jobTitle)} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
