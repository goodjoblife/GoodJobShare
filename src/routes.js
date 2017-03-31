import App from './containers/Layout';
import LandingPage from './containers/LandingPage';

const routes = () => ({
  path: '/',
  component: App,
  indexRoute: {
    component: LandingPage,
  },
  childRoutes: [{
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
