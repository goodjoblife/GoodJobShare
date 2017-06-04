import { div } from 'react';
import App from './containers/Layout';
import LandingPage from './containers/LandingPage';
import LaborRightsMenu from './containers/LaborRightsMenu';
import LaborRightsSingle from './containers/LaborRightsSingle';
import ExperienceSearchPage from './containers/ExperienceSearchPage';
import ExperienceDetailPage from './containers/ExperienceDetailPage';
import AnotherPage from './containers/AnotherPage';
import NotFound from './components/common/NotFound';

import Entry from './components/ShareExperience/Entry';
import ShareExperience
from './components/ShareExperience';
import InterviewFormContainer
from './containers/ShareExperience/InterviewFormContainer';
import WorkExperiencesFormContainer
  from './containers/ShareExperience/WorkExperiencesFormContainer';

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
      /*
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/LaborRightsMenu').default);
        }, 'labor-rights-menu');
      },
      */
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
      path: 'experiences/search',
      component: ExperienceSearchPage,
      /*
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/ExperienceSearchPage').default);
        }, 'search');
      },
      */
    },
    {
      path: 'experiences/:id',
      component: ExperienceDetailPage,
      /*
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/ExperienceDetailPage').default);
        }, 'detail');
      },
      */
    },
    {
      path: 'share',
      // getComponent(nextState, cb) {
      //   require.ensure([], require => {
      //     cb(null, require('./components/ShareExperience').default);
      //   }, 'ShareExperience');
      // },
      component: ShareExperience,
      indexRoute: {
        component: Entry,
      },
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
      path: 'another',
      component: AnotherPage,
      /*
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/AnotherPage').default);
        }, 'another');
      },
      */
    },
    {
      path: '*',
      component: NotFound,
      /*
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/NotFound').default);
        }, 'notFound');
      },
      */
    }],
});


export default routes;
