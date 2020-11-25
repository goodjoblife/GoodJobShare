import React from 'react';
import LandingPage from './containers/LandingPage';
import LaborRightsMenu from './containers/LaborRightsMenu';
import LaborRightsSingle from './containers/LaborRightsSingle';
import TimeAndSalary from './components/TimeAndSalary';
import TimeAndSalaryBoard from './containers/SalaryWorkTime/TimeAndSalaryBoard';
import SalaryWorkTimeSearchScreen from './containers/SalaryWorkTime/SearchScreen';

import TimeAndSalaryNotFound from './components/TimeAndSalary/NotFound';
import CampaignTimeAndSalary from './containers/CampaignTimeAndSalary';
import CampaignTimeAndSalaryBoard from './containers/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';
import CampaignTimeAndSalaryNotFound from './containers/CampaignTimeAndSalary/NotFound';
import ExperienceSearchPage from './containers/ExperienceSearchPage';
import ExperienceDetail from './containers/ExperienceDetail';
import NotFound from './components/common/NotFound';
import ShareExperience from './components/ShareExperience';
import ShareExperienceEntry from './components/ShareExperience/Entry';
import InterviewForm from './containers/ShareExperience/InterviewStepsFormContainer';
import TimeSalaryForm from './containers/ShareExperience/TimeSalaryFormContainer';
import CampaignTimeAndSalaryForm from './containers/ShareExperience/CampaignTimeAndSalaryFormContainer';
import WorkExperiencesForm from './containers/ShareExperience/WorkExperiencesFormContainer';
import Me from './components/Me';
import About from './components/About';
import Faq from './components/Faq';
import Guidelines from './components/Guidelines';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Redirect from 'common/routing/Redirect';
import VerificationPage from './components/EmailVerification/VerificationPage';
import CompanyAndJobTitlePageContainer from './components/CompanyAndJobTitle';
import CompanyPageProvider from './components/Company/CompanyPageProvider';
import CompanyIndexProvider from './components/Company/CompanyIndexProvider';
import JobTitlePageProvider from './components/JobTitle/JobTitlePageProvider';
import JobTitleIndexProvider from './components/JobTitle/JobTitleIndexProvider';
import MyUnlockedContentsPage from './pages/MyUnlockedContentsPage';

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
    path: '/experiences/search',
    exact: true,
    component: ExperienceSearchPage,
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
        component: InterviewForm,
        routes: [
          {
            path: '/share/interview/step1',
            exact: true,
          },
          {
            path: '/share/interview/step2',
            exact: true,
          },
          {
            path: '/share/interview/step3',
            exact: true,
          },
          {
            component: ({ location: { search } }) => (
              <Redirect to={`/share/interview/step1${search}`} />
            ),
          },
        ],
      },
      {
        path: '/share/time-and-salary',
        exact: true,
        component: TimeSalaryForm,
      },
      {
        path: '/share/time-and-salary/campaigns/:campaign_name',
        exact: true,
        component: CampaignTimeAndSalaryForm,
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
    path: '/time-and-salary/campaigns/:campaign_name',
    component: CampaignTimeAndSalary,
    routes: [
      {
        path: '/time-and-salary/campaigns/:campaign_name/latest',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/time-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/work-time-dashboard',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/work-time-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/salary-dashboard',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/salary-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        component: CampaignTimeAndSalaryNotFound,
      },
    ],
  },
  {
    path: '/time-and-salary',
    component: TimeAndSalary,
    routes: [
      {
        path: '/time-and-salary/company/:keyword',
        exact: false,
        component: ({ match }) => (
          <Redirect
            to={`/salary-work-times?q=${match.params.keyword}&s_by=company`}
          />
        ),
      },
      {
        path: '/time-and-salary/job-title/:keyword',
        exact: false,
        component: ({ match }) => (
          <Redirect
            to={`/salary-work-times?q=${match.params.keyword}&s_by=job_title`}
          />
        ),
      },
      {
        path: '/time-and-salary',
        exact: false,
        component: () => <Redirect to="/salary-work-times/latest" />,
      },
      {
        component: TimeAndSalaryNotFound,
      },
    ],
  },
  {
    path: '/salary-work-times',
    component: TimeAndSalary,
    routes: [
      {
        path: '/salary-work-times/latest',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        component: TimeAndSalaryNotFound,
      },
    ],
  },
  {
    path: '/search',
    component: TimeAndSalary,
    routes: [
      {
        path: '/search',
        exact: true,
        component: SalaryWorkTimeSearchScreen,
      },
      {
        component: TimeAndSalaryNotFound,
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
        path: '/companies/:companyName',
        component: CompanyPageProvider,
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
        path: '/job-titles/:jobTitle',
        component: JobTitlePageProvider,
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/me',
    component: Me,
    exact: true,
  },
  {
    path: '/me/unlocked-contents',
    component: MyUnlockedContentsPage,
    exact: true,
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
    component: NotFound,
  },
];

export default routes;
