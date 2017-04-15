import App from './containers/Layout';
import LandingPage from './containers/LandingPage';

const routes = () => ({
  path: '/',
  component: App,
  indexRoute: {
    component: LandingPage,
  },
  childRoutes: [{
    path: 'labor-rights',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/LaborRightsMenu').default);
      }, 'labor-rights-menu');
    },
  }, {
    path: 'labor-rights/:id',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/LaborRights').default);
      }, 'labor-rights');
    },
  }, {
    path: 'experiences/search',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/ExperienceSearchPage').default);
      }, 'search');
    },
  }, {
    path: 'experiences/:id',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/ExperienceDetailPage').default);
      }, 'detail');
    },
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
