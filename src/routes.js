import React from 'react';
import { generatePath } from 'react-router';
import LandingPage from './components/LandingPage';
import LaborRightsMenu from './components/LaborRightsMenu';
import LaborRightsSingle from './components/LaborRightsSingle';
import TimeAndSalary from './components/TimeAndSalary';
import SalaryWorkTimeSearchScreen from './components/TimeAndSalary/SearchScreen';
import ExperienceDetail from './components/ExperienceDetail';
import NotFound from './components/common/NotFound';
import ShareExperience from './components/ShareExperience';
import ShareExperienceEntry from './components/ShareExperience/Entry';
import WorkExperiencesForm from './containers/ShareExperience/WorkExperiencesFormContainer';
import Me from './components/Me';
import Buy from './components/Buy';
import About from './components/About';
import Faq from './components/Faq';
import Guidelines from './components/Guidelines';
import Privacy from './components/Privacy';
import ProductAndRefundPolicy from './components/ProductAndRefundPolicy';
import Terms from './components/Terms';
import Redirect from 'common/routing/Redirect';
import VerificationPage from './components/EmailVerification/VerificationPage';

import CompanyAndJobTitlePageContainer from './components/CompanyAndJobTitle';
import CompanyIndexProvider from 'pages/Company/CompanyIndexProvider';
import CompanyOverviewProvider from 'pages/Company/CompanyOverviewProvider';
import CompanyTimeAndSalaryProvider from 'pages/Company/CompanyTimeAndSalaryProvider';
import CompanyInterviewExperiencesProvider from 'pages/Company/CompanyInterviewExperiencesProvider';
import CompanyWorkExperiencesProvider from 'pages/Company/CompanyWorkExperiencesProvider';
import JobTitleIndexProvider from 'pages/JobTitle/JobTitleIndexProvider';
import JobTitleOverviewProvider from 'pages/JobTitle/JobTitleOverviewProvider';
import JobTitleTimeAndSalaryProvider from 'pages/JobTitle/JobTitleTimeAndSalaryProvider';
import JobTitleInterviewExperiencesProvider from 'pages/JobTitle/JobTitleInterviewExperiencesProvider';
import JobTitleWorkExperiencesProvider from 'pages/JobTitle/JobTitleWorkExperiencesProvider';

import PlanPage from './components/PlanPage';
import BuyResultPage from './components/BuyResultPage';
import CurrentSubscriptionPage from './components/Me/CurrentSubscriptionPage';
import SubscriptionsPage from './components/Me/SubscriptionsPage';
import {
  jobTitleOverviewPath,
  jobTitleSalaryWorkTimesPath,
  jobTitleInterviewExperiencesPath,
  jobTitleWorkExperiencesPath,
  companyOverviewPath,
  companySalaryWorkTimesPath,
  companyInterviewExperiencesPath,
  companyWorkExperiencesPath,
  companyOverviewLegacyPath,
  jobTitleOverviewLegacyPath,
} from 'constants/linkTo';
import { pageNameSelector as companyPageNameSelector } from 'pages/Company/usePageName';
import { pageNameSelector as jobTitlePageNameSelector } from 'pages/JobTitle/usePageName';

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
        component: WorkExperiencesForm,
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/search',
    exact: true,
    // TODO: remove TimeAndSalary
    component: TimeAndSalary,
    routes: [
      {
        path: '/search',
        exact: true,
        component: SalaryWorkTimeSearchScreen,
      },
    ],
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
          const companyName = companyPageNameSelector(params);
          const path = generatePath(companyOverviewPath, { companyName });
          return <Redirect to={path} />;
        },
      },
      {
        path: companySalaryWorkTimesPath,
        component: CompanyTimeAndSalaryProvider,
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
          const jobTitle = jobTitlePageNameSelector(params);
          const path = generatePath(jobTitleOverviewPath, { jobTitle });
          return <Redirect to={path} />;
        },
      },
      {
        path: jobTitleSalaryWorkTimesPath,
        component: JobTitleTimeAndSalaryProvider,
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
    path: '/verify',
    exact: true,
    component: VerificationPage,
    hasHeader: false,
    hasFooter: false,
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
    component: NotFound,
  },
];

export default routes;
