import React, { Fragment, useCallback } from 'react';
import { Switch, useLocation, useHistory } from 'react-router-dom';
import { omit } from 'ramda';

import { AppRouteWithSubRoutes } from '../route';
import styles from './App.module.css';
import Header from './Header';
import Footer from './Footer';
import StaticHelmet from 'common/StaticHelmet';
import LoginModal from 'common/LoginModal';
import ShareInterviewModal from '../ShareExperience/InterviewForm/TypeForm';

import routes from '../../routes';

const useShare = () => {
  const location = useLocation();
  const state = location.state || {};
  const share = state.share;
  const history = useHistory();
  const exitShare = useCallback(
    () => history.push({ state: omit(['share'], state) }),
    [history, state],
  );
  return [share, exitShare];
};

const useLoginToggle = () => {
  const location = useLocation();
  const state = location.state || {};
  const isLoginOn = state.login;
  const history = useHistory();
  const closeLogin = useCallback(
    () => history.push({ state: omit(['login'], state) }),
    [history, state],
  );
  return [isLoginOn, closeLogin];
};

const App = () => {
  const [share, exitShare] = useShare();
  const [isLoginOn, closeLogin] = useLoginToggle();
  return (
    <Fragment>
      <Switch>
        {routes.map((route, i) => (
          <AppRouteWithSubRoutes key={i} {...route}>
            {({ hasHeader, hasFooter, children }) => (
              <div className={styles.App}>
                {hasHeader ? <Header /> : null}
                <StaticHelmet.Default />
                <div className={styles.content}>{children}</div>
                {hasFooter ? <Footer /> : null}
              </div>
            )}
          </AppRouteWithSubRoutes>
        ))}
      </Switch>
      <ShareInterviewModal open={share === 'interview'} onClose={exitShare} />
      <LoginModal isOpen={isLoginOn} close={closeLogin} />
    </Fragment>
  );
};

export default App;
