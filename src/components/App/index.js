import { omit } from 'ramda';
import React, { Fragment, useCallback, useRef } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import LoginModal from 'common/LoginModal';
import CollapsedDrawer from 'common/Questionnaire/CollapsedDrawer';
import ExpandedModal from 'common/Questionnaire/ExpandedModal';
import { STATE_SHARE } from 'common/ShareExpSection/shareLinkTo';
import StaticHelmet from 'common/StaticHelmet';
import useLocStateToastObserver from 'hooks/toastNotification/useLocStateToastObserver';

import { AppRouteWithSubRoutes } from '../route';
import styles from './App.module.css';
import Footer from './Footer';
import Header from './Header';
import TabBar from './TabBar';
import routes from '../../routes';
import tabBarStyles from './TabBar/TabBar.module.css';
import ShareInterviewModal from '../ShareExperience/InterviewForm/TypeForm';
import SharePolicyModal from '../ShareExperience/PolicyForm/TypeForm';
import ShareSalaryWorkTimesModal from '../ShareExperience/TimeSalaryForm/TypeForm';
import ShareWorkExperienceModal from '../ShareExperience/WorkExperiencesForm/TypeForm';
import ToastNotification from '../ToastNotification/ToastNotification';

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
  const searchInputRef = useRef(null);

  const focusSearch = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useLocStateToastObserver();
  return (
    <Fragment>
      <Switch>
        {routes.map((route, i) => (
          <AppRouteWithSubRoutes key={i} {...route}>
            {({ hasHeader, hasFooter, children }) => (
              <div className={tabBarStyles.aboveTabbar}>
                <ToastNotification />
                {hasHeader ? <Header searchInputRef={searchInputRef} /> : null}
                <StaticHelmet.Default />
                <div className={styles.content}>{children}</div>
                {hasFooter ? <Footer /> : null}
              </div>
            )}
          </AppRouteWithSubRoutes>
        ))}
      </Switch>
      <TabBar className={styles.mobileOnly} focusSearch={focusSearch} />
      <ShareInterviewModal
        open={share === STATE_SHARE.INTERVIEW}
        onClose={exitShare}
      />
      <ShareWorkExperienceModal
        open={share === STATE_SHARE.WORK_EXPERIENCE}
        onClose={exitShare}
      />
      <ShareSalaryWorkTimesModal
        open={
          share === STATE_SHARE.SALARY_WORK_TIME ||
          share === STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR
        }
        onClose={exitShare}
        hideProgressBar={share === STATE_SHARE.SALARY_WORK_TIME_NO_PROGRESS_BAR}
      />
      <SharePolicyModal
        open={share === STATE_SHARE.POLICY}
        onClose={exitShare}
      />
      <LoginModal />
      <CollapsedDrawer
        render={({ handleToggleModalOpen }) => (
          <ExpandedModal handleToggleModalOpen={handleToggleModalOpen} />
        )}
      />
    </Fragment>
  );
};

export default App;
