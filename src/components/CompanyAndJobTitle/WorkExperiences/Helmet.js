import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import qs from 'qs';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from 'constants/helmetData';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

const CompanyWorkExperienceHelmet = ({ companyName, page, totalCount }) => {
  // title
  const title =
    page === 1 ? `${companyName} 評價` : `${companyName} 評價 - 第${page}頁`;

  // description
  let description = `目前還沒有${companyName}的評價。分享你的評價，一起讓職場更透明！`;
  if (totalCount > 0) {
    description = `在${companyName}工作好嗎？由${companyName}員工分享工作心得與狀況，${companyName}工時、升遷、福利狀況一次看。`;
  }

  // canonical url
  const path = generatePath('/companies/:companyName/work-experiences', {
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
        content={`${companyName}評價, ${companyName}內部實況, ${companyName}企業文化, ${companyName}職場甘苦談`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

CompanyWorkExperienceHelmet.propTypes = {
  companyName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

const JobTitleWorkExperienceHelmet = ({ jobTitle, page, totalCount }) => {
  // title
  const title = `${jobTitle} 評價列表 - 第${page}頁`;

  // description
  let description = `目前還沒有${jobTitle}的評價。分享你的評價，一起讓職場更透明！`;
  if (totalCount > 0) {
    description = `查看${totalCount}篇${jobTitle}評價`;
  }

  // canonical url
  const path = generatePath('/job-titles/:jobTitle/work-experiences', {
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
        content={`${jobTitle}評價, ${jobTitle}職場甘苦談`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

JobTitleWorkExperienceHelmet.propTypes = {
  jobTitle: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

const WorkExperienceHelmet = props => {
  if (props.pageType === PAGE_TYPE.JOB_TITLE) {
    return (
      <JobTitleWorkExperienceHelmet {...props} jobTitle={props.pageName} />
    );
  } else if (props.pageType === PAGE_TYPE.COMPANY) {
    return (
      <CompanyWorkExperienceHelmet {...props} companyName={props.pageName} />
    );
  } else {
    return null;
  }
};

WorkExperienceHelmet.propTypes = {
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default WorkExperienceHelmet;
