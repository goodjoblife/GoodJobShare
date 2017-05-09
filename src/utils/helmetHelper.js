export const siteName = '工時薪資透明化運動';

export const formatTitle = title =>
  `${title} | 工時薪資透明化運動`;

export const formatCanonicalPath = path =>
  `https://www.goodjob.life${path}`;

export const formatUrl = url => {
  if (url.lastIndexOf('//', 0) === 0) {
    return `https:${url}`;
  }
  return url;
};
