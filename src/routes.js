import React from 'react';
import { generatePath } from 'react-router';

import Redirect from 'common/routing/Redirect';
import {
  companyInterviewExperiencesPath,
  companyOverviewLegacyPath,
  companyOverviewPath,
  companySalaryWorkTimesPath,
  companyWorkExperiencesAspectPath,
  companyWorkExperiencesPath,
  jobTitleInterviewExperiencesPath,
  jobTitleOverviewLegacyPath,
  jobTitleOverviewPath,
  jobTitleSalaryWorkTimesPath,
  jobTitleWorkExperiencesPath,
} from 'constants/linkTo';
import CompanyIndexProvider from 'pages/Company/CompanyIndexProvider';
import CompanyInterviewExperiencesProvider from 'pages/Company/CompanyInterviewExperiencesProvider';
import CompanyOverviewProvider from 'pages/Company/CompanyOverviewProvider';
import CompanySalaryWorkTimeProvider from 'pages/Company/CompanySalaryWorkTimeProvider';
import CompanyWorkExperiencesAspectProvider from 'pages/Company/CompanyWorkExperiencesAspectProvider';
import CompanyWorkExperiencesProvider from 'pages/Company/CompanyWorkExperiencesProvider';
import { companyNameSelector } from 'pages/Company/useCompanyName';
import JobTitleIndexProvider from 'pages/JobTitle/JobTitleIndexProvider';
import JobTitleInterviewExperiencesProvider from 'pages/JobTitle/JobTitleInterviewExperiencesProvider';
import JobTitleOverviewProvider from 'pages/JobTitle/JobTitleOverviewProvider';
import JobTitleSalaryWorkTimeProvider from 'pages/JobTitle/JobTitleSalaryWorkTimeProvider';
import JobTitleWorkExperiencesProvider from 'pages/JobTitle/JobTitleWorkExperiencesProvider';
import { jobTitleSelector } from 'pages/JobTitle/useJobTitle';
import SearchPage from 'pages/SearchPage';

import About from './components/About';
import Buy from './components/Buy';
import BuyResultPage from './components/BuyResultPage';
import NotFound from './components/common/NotFound';
import CompanyAndJobTitlePageContainer from './components/CompanyAndJobTitle';
import ExperienceDetail from './components/ExperienceDetail';
import Faq from './components/Faq';
import Guidelines from './components/Guidelines';
import LaborRightsMenu from './components/LaborRightsMenu';
import LaborRightsSingle from './components/LaborRightsSingle';
import LandingPage from './components/LandingPage';
import Me from './components/Me';
import CurrentSubscriptionPage from './components/Me/CurrentSubscriptionPage';
import SubscriptionsPage from './components/Me/SubscriptionsPage';
import PlanPage from './components/PlanPage';
import Privacy from './components/Privacy';
import ProductAndRefundPolicy from './components/ProductAndRefundPolicy';
import ShareExperience from './components/ShareExperience';
import ShareExperienceEntry from './components/ShareExperience/Entry';
import Terms from './components/Terms';
import InboxPage from './pages/InboxPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/labor-rights',
    exact: true,
    component: LaborRightsMenu,
  },
  {
    path: '/labor-rights/:id',
    exact: true,
    component: LaborRightsSingle,
  },
  {
    path: '/experiences/:id',
    component: ExperienceDetail,
  },
  {
    path: '/share',
    exact: true,
    component: ShareExperienceEntry,
  },
  {
    path: '/share',
    component: ShareExperience,
    routes: [
      {
        path: '/share/interview',
        component: () => <Redirect to="/share" />,
      },
      {
        path: '/share/interview-one-page',
        exact: true,
        component: () => <Redirect to="/share" />,
      },
      {
        path: '/share/time-and-salary',
        exact: true,
        component: () => <Redirect to="/share" />,
      },
      {
        path: '/share/work-experiences',
        exact: true,
        component: () => <Redirect to="/share" />,
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/search',
    exact: true,
    component: SearchPage,
  },
  {
    path: '/companies',
    component: CompanyAndJobTitlePageContainer,
    routes: [
      {
        path: '/companies',
        component: CompanyIndexProvider,
        exact: true,
      },
      {
        path: companyOverviewPath,
        component: CompanyOverviewProvider,
        exact: true,
      },
      {
        path: companyOverviewLegacyPath, // 相容舊網址
        exact: true,
        render: ({ match: { params } }) => {
          const companyName = companyNameSelector(params);
          const path = generatePath(companyOverviewPath, { companyName });
          return <Redirect to={path} />;
        },
      },
      {
        path: companySalaryWorkTimesPath,
        component: CompanySalaryWorkTimeProvider,
        exact: true,
      },
      {
        path: companyInterviewExperiencesPath,
        component: CompanyInterviewExperiencesProvider,
        exact: true,
      },
      {
        path: companyWorkExperiencesPath,
        component: CompanyWorkExperiencesProvider,
        exact: true,
      },
      {
        path: companyWorkExperiencesAspectPath,
        component: CompanyWorkExperiencesAspectProvider,
        exact: true,
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/job-titles',
    component: CompanyAndJobTitlePageContainer,
    routes: [
      {
        path: '/job-titles',
        component: JobTitleIndexProvider,
        exact: true,
      },
      {
        path: jobTitleOverviewPath,
        component: JobTitleOverviewProvider,
        exact: true,
      },
      {
        path: jobTitleOverviewLegacyPath, // 相容舊網址
        exact: true,
        render: ({ match: { params } }) => {
          const jobTitle = jobTitleSelector(params);
          const path = generatePath(jobTitleOverviewPath, { jobTitle });
          return <Redirect to={path} />;
        },
      },
      {
        path: jobTitleSalaryWorkTimesPath,
        component: JobTitleSalaryWorkTimeProvider,
        exact: true,
      },
      {
        path: jobTitleInterviewExperiencesPath,
        component: JobTitleInterviewExperiencesProvider,
        exact: true,
      },
      {
        path: jobTitleWorkExperiencesPath,
        component: JobTitleWorkExperiencesProvider,
        exact: true,
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/buy',
    exact: true,
    component: Buy,
  },
  {
    path: '/me',
    exact: true,
    component: Me,
  },
  {
    path: '/me/subscriptions',
    exact: true,
    component: SubscriptionsPage,
  },
  {
    path: '/me/subscriptions/current',
    exact: true,
    component: CurrentSubscriptionPage,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/faq',
    exact: true,
    component: Faq,
  },
  {
    path: '/guidelines',
    exact: true,
    component: Guidelines,
  },
  {
    path: '/privacy-policy',
    exact: true,
    component: Privacy,
  },
  {
    path: '/product-and-refund',
    exact: true,
    component: ProductAndRefundPolicy,
  },
  {
    path: '/user-terms',
    exact: true,
    component: Terms,
  },
  {
    path: '/plans',
    exact: true,
    component: PlanPage,
  },
  {
    path: '/buy/result/:paymentRecordId',
    exact: true,
    component: BuyResultPage,
  },
  {
    path: '/inbox',
    exact: true,
    component: InboxPage,
    hasFooter: false,
  },
  {
    component: NotFound,
  },
];

export default routes;
