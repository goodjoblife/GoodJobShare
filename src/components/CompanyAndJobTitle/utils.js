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
  switch (pageType) {
    case PAGE_TYPE.COMPANY:
      return {
        label: experience.job_title.name,
        to: {
          pathname: generatePath('/experiences/:id', { id: experience._id }),
          state: { pageType },
        },
      };
    case PAGE_TYPE.JOB_TITLE:
      return {
        label: experience.company.name,
        to: {
          pathname: generatePath('/experiences/:id', { id: experience._id }),
          state: { pageType },
        },
      };
    default:
      return { label: '', to: '' };
  }
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
