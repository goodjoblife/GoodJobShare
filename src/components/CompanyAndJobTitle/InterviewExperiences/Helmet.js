import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import qs from 'qs';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

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
  const path = generatePath('/companies/:companyName/interview-experiences', {
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
        content={`${companyName}面試心得, ${companyName}面試問題, ${companyName}面談薪資`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

CompanyInterviewExperienceHelmet.propTypes = {
  companyName: PropTypes.string.isRequired,
  interviewExperiences: PropTypes.array,
  page: PropTypes.number.isRequired,
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
  const path = generatePath('/job-titles/:jobTitle/interview-experiences', {
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
        content={`${jobTitle}面試心得, ${jobTitle}面試問題, ${jobTitle}面談薪資`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

JobTitleInterviewExperienceHelmet.propTypes = {
  interviewExperiences: PropTypes.array,
  jobTitle: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

const InterviewExperienceHelmet = props => {
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

InterviewExperienceHelmet.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default InterviewExperienceHelmet;
