export const formatTitle = (title, siteName) => `${title} | ${siteName}`;

export const formatCanonicalPath = path => `https://www.goodjob.life${path}`;

export const formatUrl = url => {
  if (url && url.lastIndexOf('//', 0) === 0) {
    return `https:${url}`;
  }
  return url;
};
