import React, { Fragment, useCallback } from 'react';
import { Switch, useLocation, useHistory } from 'react-router-dom';
import { omit } from 'ramda';

import StaticHelmet from 'common/StaticHelmet';
import LoginModal from 'common/LoginModal';
import useLocStateToastObserver from 'hooks/toastNotification/useLocStateToastObserver';

import ToastNotification from '../ToastNotification/ToastNotification';
import { AppRouteWithSubRoutes } from '../route';
import styles from './App.module.css';
import Header from './Header';
import Footer from './Footer';
import ShareInterviewModal from '../ShareExperience/InterviewForm/TypeForm';
import ShareSalaryWorkTimesModal from '../ShareExperience/TimeSalaryForm/TypeForm';
import routes from '../../routes';
import NetPromoter from 'common/QuestionnaireLabel/NetPromoter';

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

const App = () => {
  const [share, exitShare] = useShare();

  useLocStateToastObserver();
  return (
    <Fragment>
      <Switch>
        {routes.map((route, i) => (
          <AppRouteWithSubRoutes key={i} {...route}>
            {({ hasHeader, hasFooter, children }) => (
              <div className={styles.App}>
                <ToastNotification />
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
      <ShareSalaryWorkTimesModal
        open={share === 'salary-work-times'}
        onClose={exitShare}
      />
      <LoginModal />
      <NetPromoter />
    </Fragment>
  );
};

export default App;
