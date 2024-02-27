import React from 'react';
import Helmet from 'react-helmet';
import { generatePath } from 'react-router';
import qs from 'qs';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { IMG_HOST, SITE_NAME } from 'constants/helmetData';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

const CompanySalaryWorkTimeHelmet = ({
  companyName,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  page,
}) => {
  // title
  const title = `${companyName} 薪水&加班狀況 - 第${page}頁`;

  // description
  let description = `目前還沒有${companyName}的薪水、加班狀況資料。分享你的薪水、加班狀況，一起讓職場更透明。`;
  if (salaryWorkTimes && salaryWorkTimes.length > 0) {
    description = `查看${salaryWorkTimes.length}筆由${companyName}內部員工提供的薪水、加班狀況資料。`;
  }

  // canonical url
  const path = generatePath('/companies/:companyName/salary-work-times', {
    companyName,
  });
  const search =
    page > 1 ? qs.stringify({ p: page }, { addQueryPrefix: true }) : '';
  const url = formatCanonicalPath(`${path}${search}`);

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta
        name="keywords"
        content={`${companyName}薪水, ${companyName}薪資, ${companyName}加班狀況, ${companyName}工時`}
      />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/time-and-salary.jpg`}
      />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

const JobTitleSalaryWorkTimeHelmet = ({
  jobTitle,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  page,
}) => {
  // title
  const title = `${jobTitle} 薪水&加班狀況 - 第${page}頁`;

  // description
  let description = `目前還沒有${jobTitle}的薪水、加班狀況資料。分享你的薪水、加班狀況，一起讓職場更透明。`;
  if (salaryWorkTimes && salaryWorkTimes.length > 0) {
    description = `查看${salaryWorkTimes.length}筆由${jobTitle}提供的薪水、加班狀況資料。`;
  }

  // canonical url
  const path = generatePath('/job-titles/:jobTitle/salary-work-times', {
    jobTitle,
  });
  const search =
    page > 1 ? qs.stringify({ p: page }, { addQueryPrefix: true }) : '';
  const url = formatCanonicalPath(`${path}${search}`);

  return (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta
        name="keywords"
        content={`${jobTitle}薪水, ${jobTitle}薪資, ${jobTitle}加班狀況, ${jobTitle}工時`}
      />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/time-and-salary.jpg`}
      />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default props => {
  if (props.pageType === PAGE_TYPE.JOB_TITLE) {
    return (
      <JobTitleSalaryWorkTimeHelmet {...props} jobTitle={props.pageName} />
    );
  } else if (props.pageType === PAGE_TYPE.COMPANY) {
    return (
      <CompanySalaryWorkTimeHelmet {...props} companyName={props.pageName} />
    );
  } else {
    return null;
  }
};
