import React from 'react';
import Helmet from 'react-helmet';
import { generatePath } from 'react-router';

import { AspectRatingStatistics } from 'apis/aspectRatingStatistics';
import { Aspect } from 'constants/companyJobTitle';
import { SITE_NAME } from 'constants/helmetData';
import { companyWorkExperiencesAspectPath } from 'constants/linkTo';
import { formatCanonicalPath, formatTitle } from 'utils/helmetHelper';

// 各面向的延伸關鍵字，會接在公司名稱後面
const aspectKeywords: Record<Aspect, string[]> = {
  [Aspect.GENDER]: ['性別平等', '女性友善', '性別歧視'],
  [Aspect.WORK_LIFE_BALANCE]: ['工作生活平衡', 'WLB', '請假'],
  [Aspect.COMPENSATION]: ['薪水', '福利', '年終', '分紅'],
  [Aspect.JOB_CONTENT]: ['工作環境', '職務內容', '工作壓力'],
  [Aspect.WORK_TIME]: ['工時', '加班', '加班費'],
  [Aspect.CULTURE]: ['企業文化', '團隊氣氛', '內部實況'],
  [Aspect.MANAGEMENT]: ['主管', '管理風格', '管理制度'],
  [Aspect.GROWTH]: ['職涯發展', '教育訓練', '學習機會'],
  [Aspect.PROMOTION]: ['升遷', '考績', '調薪'],
};

const formatKeywords = (companyName: string, aspect: Aspect): string =>
  [aspect, ...(aspectKeywords[aspect] || []), '評價']
    .map(keyword => `${companyName}${keyword}`)
    .join(', ');

type CompanyWorkExperiencesAspectHelmetProps = {
  companyName: string;
  aspect: Aspect;
  page: number;
  statistics?: AspectRatingStatistics;
};

const CompanyWorkExperiencesAspectHelmet: React.FC<
  CompanyWorkExperiencesAspectHelmetProps
> = ({ companyName, aspect, page, statistics }) => {
  const title =
    page === 1
      ? `${companyName} ${aspect}`
      : `${companyName} ${aspect} - 第${page}頁`;

  let description = `${companyName} ${aspect}如何？由${companyName}員工分享的${aspect}一次看。`;
  if (statistics && statistics.ratingCount > 0) {
    const { averageRating, ratingCount } = statistics;
    const rating = averageRating.toFixed(1);
    description += `共 ${ratingCount} 筆評價，平均 ${rating} 分。`;
  }

  const path = generatePath(companyWorkExperiencesAspectPath, {
    companyName,
    aspect,
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
      <meta name="keywords" content={formatKeywords(companyName, aspect)} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default CompanyWorkExperiencesAspectHelmet;
