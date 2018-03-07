import React from 'react';

import LandingPage from './containers/LandingPage';
import TimeAndSalary from './components/TimeAndSalary';
import TimeAndSalaryBoard from './containers/TimeAndSalary/TimeAndSalaryBoard';
import About from './components/About';


const routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
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
