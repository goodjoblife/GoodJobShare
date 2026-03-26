import {
  pageTypeTranslation,
  tabTypeTranslation,
  tabType as TAG_TYPE,
  generateIndexURL,
  generatePageURL,
  generateTabURL,
} from 'constants/companyJobTitle';

const generateRootLayer = () => ({
  label: 'GoodJob',
  to: '/',
});

const generatePageTypeLayer = ({ pageType }) => ({
  label: pageTypeTranslation[pageType],
  to: generateIndexURL({ pageType }),
});

const generatePageNameLayer = ({ pageType, pageName }) => ({
  label: pageName,
  to: generatePageURL({ pageType, pageName }),
});

const generateTabTypeLayer = ({ pageType, pageName, tabType }) => ({
  label: tabTypeTranslation[tabType],
  to: generateTabURL({
    pageType,
    pageName,
    tabType,
  }),
});

export const generateBreadCrumbData = ({
  pageType,
  pageName,
  tabType,
  experience,
}) => {
  const data = [
    generateRootLayer(),
    generatePageTypeLayer({ pageType }),
    generatePageNameLayer({ pageType, pageName }),
  ];

  // TODO: adhoc solution if the page is OVERVIEW
  if (tabType === TAG_TYPE.OVERVIEW) {
    return data;
  }

  data.push(generateTabTypeLayer({ pageType, pageName, tabType }));

  return data;
};
