import React, { Fragment, useMemo, useCallback } from 'react';
import { Switch, useLocation, useHistory } from 'react-router-dom';
import { parse, stringify } from 'qs';
import { omit } from 'ramda';

import { AppRouteWithSubRoutes } from '../route';
import styles from './App.module.css';
import Header from '../../containers/App/Header';
import Footer from './Footer';
import StaticHelmet from 'common/StaticHelmet';
import ShareInterviewModal from '../ShareExperience/InterviewForm/TypeForm';
import routes from '../../routes';

const useShare = () => {
  const location = useLocation();
  const query = useMemo(
    () => parse(location.search, { ignoreQueryPrefix: true }),
    [location.search],
  );
  const share = query.share;
  const history = useHistory();
  const exitShare = useCallback(
    () => history.push(`?${stringify(omit(['share'], query))}`),
    [history, query],
  );
  return [share, exitShare];
};

const App = () => {
  const [share, exitShare] = useShare();
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
    </Fragment>
  );
};

export default App;
