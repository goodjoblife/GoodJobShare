import React from 'react';

import LandingPage from './containers/LandingPage';
import LaborRightsMenu from './containers/LaborRightsMenu';
import LaborRightsSingle from './containers/LaborRightsSingle';
import TimeAndSalary from './components/TimeAndSalary';
import TimeAndSalaryBoard from './containers/TimeAndSalary/TimeAndSalaryBoard';
import ShareExperience from './components/ShareExperience';
import ShareExperienceEntry from './components/ShareExperience/Entry';
import InterviewForm from './containers/ShareExperience/InterviewFormContainer';
import TimeSalaryForm from './containers/ShareExperience/TimeSalaryFormContainer';
import WorkExperiencesForm from './containers/ShareExperience/WorkExperiencesFormContainer';
import About from './components/About';


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
        exact: true,
        component: InterviewForm,
      },
      {
        path: '/share/time-and-salary',
        exact: true,
        component: TimeSalaryForm,
      },
      {
        path: '/share/work-experiences',
        exact: true,
        component: WorkExperiencesForm,
      },
    ],
  },
  {
    path: '/time-and-salary',
    component: TimeAndSalary,
    routes: [
      {
        path: '/time-and-salary/latest',
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/time-asc',
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/work-time-dashboard',
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/work-time-asc',
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/salary-dashboard',
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/salary-asc',
        component: TimeAndSalaryBoard,
      },
    ],
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    render: () => (<div>Not Found!</div>),
  },
];

export default routes;
