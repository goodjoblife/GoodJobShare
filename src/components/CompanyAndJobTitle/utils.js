import { formatSimpleDate } from 'utils/dateUtil';
import {
  pageTypeTranslation,
  tabTypeTranslation,
  pageType as PAGE_TYPE,
  generatePageURL,
  generateTabURL,
} from '../../constants/companyJobTitle';
import { generatePath } from 'react-router';

const generateRootLayer = () => ({
  label: 'GoodJob',
  to: '/',
});

const generatePageTypeLayer = ({ pageType }) => ({
  label: pageTypeTranslation[pageType],
  to: pageType === PAGE_TYPE.COMPANY ? '/companies' : '/job-titles',
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

const generateTitleLayer = ({ pageType, experience }) => {
  const companyName = experience.company.name;
  const jobTitle = experience.job_title.name;
  const createdAt = formatSimpleDate(new Date(experience.created_at));
  return {
    label: `${companyName} ${jobTitle} 面試經驗 ${createdAt}`,
    to: {
      pathname: generatePath('/experiences/:id', { id: experience.id }),
      state: { pageType },
    },
  };
};

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
    generateTabTypeLayer({ pageType, pageName, tabType }),
  ];

  if (experience) {
    data.push(
      generateTitleLayer({
        pageType,
        experience,
      }),
    );
  }

  return data;
};
