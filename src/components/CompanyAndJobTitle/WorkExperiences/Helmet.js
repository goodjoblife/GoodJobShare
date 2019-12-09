import React from 'react';
import Helmet from 'react-helmet';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import { SITE_NAME } from '../../../constants/helmetData';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';

const CompanyWorkExperienceHelmet = ({
  companyName,
  workExperiences,
  page,
}) => {
  // title
  const title = `${companyName} 工作心得列表 - 第${page}頁`;

  // description
  let description = `目前還沒有${companyName}}的工作心得。分享你的工作心得，一起讓職場更透明！`;
  if (workExperiences && workExperiences.length > 0) {
    description = `查看${workExperiences.length}篇${companyName}工作心得`;
  }

  // canonical url
  let url = formatCanonicalPath(`/companies/${companyName}/work-experiences`);
  if (page > 1) {
    url = formatCanonicalPath(
      `/companies/${companyName}/work-experiences?p=${page}`,
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
        content={`${companyName}工作心得, ${companyName}內部實況, ${companyName}企業文化, ${companyName}職場甘苦談`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

const JobTitleWorkExperienceHelmet = ({ jobTitle, workExperiences, page }) => {
  // title
  const title = `${jobTitle} 工作心得列表 - 第${page}頁`;

  // description
  const workExperiencesStr =
    workExperiences && workExperiences.length > 0
      ? `${workExperiences.length}篇`
      : '';
  const description = `查看${workExperiencesStr}${jobTitle}工作心得`;

  // canonical url
  let url = formatCanonicalPath(`/job-titles/${jobTitle}/work-experiences`);
  if (page > 1) {
    url = formatCanonicalPath(
      `/job-titles/${jobTitle}/work-experiences?p=${page}`,
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
        content={`${jobTitle}工作心得, ${jobTitle}職場甘苦談`}
      />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default props => {
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
