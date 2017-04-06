import App from './containers/Layout';

import LandingPage from './containers/LandingPage';

const routes = () => ({
  path: '/',
  component: App,
  indexRoute: {
    component: LandingPage,
  },
  childRoutes: [{
    path: 'labor-lecture',
    component: ({ children }) => children,
    indexRoute: {
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/LaborLectureMenu').default);
        }, 'labor-lecture-menu');
      },
    },
    childRoutes: [{
      path: ':lecture_id',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./containers/LaborLecture').default);
        }, 'labor-lecture');
      },
    }],
  }, {
    path: 'another',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/AnotherPage').default);
      }, 'another');
    },
  }, {
    path: '*',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/NotFoundPage').default);
      }, 'notFound');
    },
  }],
});

export default routes;
