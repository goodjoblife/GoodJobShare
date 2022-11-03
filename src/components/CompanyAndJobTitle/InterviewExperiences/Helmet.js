import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from '../../../constants/helmetData';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';

const CompanyInterviewExperienceHelmet = ({
  companyName,
  interviewExperiences,
  page,
}) => {
  // title
  const title = `${companyName} 面試心得列表 - 第${page}頁`;

  // description
  let description = `目前還沒有${companyName}}的面試心得。分享你的面試心得，一起讓職場更透明！`;
  if (interviewExperiences && interviewExperiences.length > 0) {
    description = `查看${interviewExperiences.length}篇${companyName}面試心得`;
  }

  // canonical url
  let url = formatCanonicalPath(
    `/companies/${companyName}/interview-experiences`,
  );
  if (page > 1) {
    url = formatCanonicalPath(
      `/companies/${companyName}/interview-experiences?p=${page}`,
    );
  }

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
        content={`${companyName}面試心得, ${companyName}面試問題, ${companyName}面談薪資`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

const JobTitleInterviewExperienceHelmet = ({
  jobTitle,
  interviewExperiences,
  page,
}) => {
  // title
  const title = `${jobTitle} 面試心得列表 - 第${page}頁`;

  // description
  let description = `目前還沒有${jobTitle}的面試心得。分享你的面試心得，一起讓職場更透明！`;
  if (interviewExperiences && interviewExperiences.length > 0) {
    description = `查看${interviewExperiences.length}篇${jobTitle}面試心得`;
  }

  // canonical url
  let url = formatCanonicalPath(
    `/job-titles/${jobTitle}/interview-experiences`,
  );
  if (page > 1) {
    url = formatCanonicalPath(
      `/job-titles/${jobTitle}/interview-experiences?p=${page}`,
    );
  }

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
        content={`${jobTitle}面試心得, ${jobTitle}面試問題, ${jobTitle}面談薪資`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default props => {
  if (props.pageType === PAGE_TYPE.JOB_TITLE) {
    return (
      <JobTitleInterviewExperienceHelmet {...props} jobTitle={props.pageName} />
    );
  } else if (props.pageType === PAGE_TYPE.COMPANY) {
    return (
      <CompanyInterviewExperienceHelmet
        {...props}
        companyName={props.pageName}
      />
    );
  } else {
    return null;
  }
};
