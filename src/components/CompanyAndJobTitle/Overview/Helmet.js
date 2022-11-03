import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from '../../../constants/helmetData';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';

// if length of given array > 0, return `${array length}${unit}`
// otherwise return defaultStr
const formatDataCount = (data, unit, defaultStr) => {
  if (data && typeof Array.isArray(data) && data.length > 0) {
    return `${data.length}${unit}`;
  } else {
    return defaultStr;
  }
};

const formatKeyword = name =>
  `${name}薪水, ${name}加班情況, ${name}工時, ${name}工作心得, ${name}面試心得`;

const CompanyOverviewHelmet = ({
  companyName,
  salaryWorkTimes,
  interviewExperiences,
  workExperiences,
}) => {
  // title
  const title = `${companyName} 總覽`;

  // description
  const salaryWorkTimesStr = formatDataCount(salaryWorkTimes, '筆', '');
  const interviewExperiencesStr = formatDataCount(
    interviewExperiences,
    '篇',
    '',
  );
  const workExperiencesStr = formatDataCount(workExperiences, '篇', '');
  const description = `查看由${companyName}內部員工分享的${salaryWorkTimesStr}薪水及加班數據、${workExperiencesStr}工作心得，以及由面試者分享的${interviewExperiencesStr}面試經驗。`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={formatKeyword(companyName)} />
      <meta
        property="og:url"
        content={formatCanonicalPath(`/companies/${companyName}/overview`)}
      />
      <link
        rel="canonical"
        href={formatCanonicalPath(`/companies/${companyName}/overview`)}
      />
    </Helmet>
  );
};

const JobTitleOverviewHelmet = ({
  jobTitle,
  salaryWorkTimes,
  interviewExperiences,
  workExperiences,
}) => {
  // title
  const title = `${jobTitle} 總覽`;

  // description
  const salaryWorkTimesStr = formatDataCount(salaryWorkTimes, '筆', '');
  const interviewExperiencesStr = formatDataCount(
    interviewExperiences,
    '篇',
    '',
  );
  const workExperiencesStr = formatDataCount(workExperiences, '篇', '');
  const description = `查看由${jobTitle}分享的${salaryWorkTimesStr}薪水及加班數據、${workExperiencesStr}工作心得，以及由面試者分享的${interviewExperiencesStr}面試經驗。`;

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={formatKeyword(jobTitle)} />
      <meta
        property="og:url"
        content={formatCanonicalPath(`/job-titles/${jobTitle}/overview`)}
      />
      <link
        rel="canonical"
        href={formatCanonicalPath(`/job-titles/${jobTitle}/overview`)}
      />
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
