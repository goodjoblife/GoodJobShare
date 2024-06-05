import React from 'react';
import Helmet from 'react-helmet';
import { generatePath } from 'react-router';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

// if length of given array > 0, return `${array length}${unit}`
// otherwise return defaultStr
const formatDataCount = (dataCount, unit, defaultStr) => {
  if (dataCount > 0) {
    return `${dataCount}${unit}`;
  } else {
    return defaultStr;
  }
};

const formatKeyword = name =>
  `${name}薪水, ${name}加班情況, ${name}工時, ${name}工作心得, ${name}面試心得`;

const CompanyOverviewHelmet = ({
  companyName,
  salaryWorkTimesCount,
  interviewExperiencesCount,
  workExperiencesCount,
}) => {
  // title
  const title = `${companyName} 總覽`;

  // description
  const salaryWorkTimesStr = formatDataCount(salaryWorkTimesCount, '筆', '');
  const interviewExperiencesStr = formatDataCount(
    interviewExperiencesCount,
    '篇',
    '',
  );
  const workExperiencesStr = formatDataCount(workExperiencesCount, '篇', '');
  const description = `查看由${companyName}內部員工分享的${salaryWorkTimesStr}薪水及加班數據、${workExperiencesStr}工作心得，以及由面試者分享的${interviewExperiencesStr}面試經驗。`;

  const path = generatePath('/companies/:companyName', { companyName });
  const url = formatCanonicalPath(path);

  return (
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
  );
};

const JobTitleOverviewHelmet = ({
  jobTitle,
  salaryWorkTimesCount,
  interviewExperiencesCount,
  workExperiencesCount,
}) => {
  // title
  const title = `${jobTitle} 總覽`;

  // description
  const salaryWorkTimesStr = formatDataCount(salaryWorkTimesCount, '筆', '');
  const interviewExperiencesStr = formatDataCount(
    interviewExperiencesCount,
    '篇',
    '',
  );
  const workExperiencesStr = formatDataCount(workExperiencesCount, '篇', '');
  const description = `查看由${jobTitle}分享的${salaryWorkTimesStr}薪水及加班數據、${workExperiencesStr}工作心得，以及由面試者分享的${interviewExperiencesStr}面試經驗。`;

  const path = generatePath('/job-titles/:jobTitle', { jobTitle });
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

export default props => {
  if (props.pageType === PAGE_TYPE.JOB_TITLE) {
    return <JobTitleOverviewHelmet {...props} jobTitle={props.pageName} />;
  } else if (props.pageType === PAGE_TYPE.COMPANY) {
    return <CompanyOverviewHelmet {...props} companyName={props.pageName} />;
  } else {
    return null;
  }
};
