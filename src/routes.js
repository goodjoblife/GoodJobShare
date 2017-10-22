import { div } from 'react';
import App from './containers/Layout';
import LandingPage from './containers/LandingPage';
import LaborRightsMenu from './containers/LaborRightsMenu';
import LaborRightsSingle from './containers/LaborRightsSingle';
import TimeAndSalary from './components/TimeAndSalary';
import TimeAndSalaryBoard from './containers/TimeAndSalary/TimeAndSalaryBoard';
import TimeAndSalaryCompany from './containers/TimeAndSalary/TimeAndSalaryCompany';
import ExperienceSearchPage from './containers/ExperienceSearchPage';
import ExperienceDetailPage from './containers/ExperienceDetailPage';
import NotFound from './components/common/NotFound';

import Entry from './components/ShareExperience/Entry';
import ShareExperience
from './components/ShareExperience';
import InterviewFormContainer
from './containers/ShareExperience/InterviewFormContainer';
import WorkExperiencesFormContainer
  from './containers/ShareExperience/WorkExperiencesFormContainer';

import Me from './containers/Me';
import About from './components/About';
import Faq from './components/Faq';
import Guidelines from './components/Guidelines';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

const routes = () => ({
  path: '/',
  component: App,
  indexRoute: {
    component: LandingPage,
  },
  childRoutes: [
    {
      path: 'labor-rights',
      component: div,
      indexRoute: {
        component: LaborRightsMenu,
      },
      childRoutes: [
        {
          path: ':id',
          component: LaborRightsSingle,
        },
      ],
    },
    {
      path: 'time-and-salary',
      component: TimeAndSalary,
      indexRoute: {
        onEnter: ({ params }, replace) => replace('/time-and-salary/latest'),
      },
      childRoutes: [
        {
          path: 'latest',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'sort/time-asc',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'work-time-dashboard',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'sort/work-time-asc',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'salary-dashboard',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'sort/salary-asc',
          component: TimeAndSalaryBoard,
        },
        {
          path: 'company/:keyword/work-time-dashboard',
          component: TimeAndSalaryCompany,
        },
        {
          path: 'company/:keyword/sort/work-time-asc',
          component: TimeAndSalaryCompany,
        },
        {
          path: 'company/:keyword/salary-dashboard',
          component: TimeAndSalaryCompany,
        },
        {
          path: 'company/:keyword/sort/salary-asc',
          component: TimeAndSalaryCompany,
        },
        {
          path: '*',
          onEnter: ({ params }, replace) => replace('/time-and-salary/latest'),
        },
      ],
    },
    {
      path: 'experiences/search',
      component: ExperienceSearchPage,
    },
    {
      path: 'experiences/:id',
      component: ExperienceDetailPage,
    },
    {
      path: 'share',
      component: Entry,
    },
    {
      path: 'share',
      component: ShareExperience,
      childRoutes: [
        {
          path: 'interview',
          component: InterviewFormContainer,
        },
        {
          path: 'work-experiences',
          component: WorkExperiencesFormContainer,
        },
      ],
    },
    {
      path: 'me',
      component: Me,
    },
    {
      path: 'about',
      component: About,
    },
    {
      path: 'faq',
      component: Faq,
    },
    {
      path: 'guidelines',
      component: Guidelines,
    },
    {
      path: 'privacy-policy',
      component: Privacy,
    },
    {
      path: 'user-terms',
      component: Terms,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});


export default routes;
