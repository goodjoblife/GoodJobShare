import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import R from 'ramda';
import { paramsSelector } from 'common/routing/selectors';
import { pageSelector } from '../TimeAndSalary/common/selectors';
import { validatePage } from '../TimeAndSalary/common/validators';

const companyNameSelector = R.compose(
  decodeURIComponent,
  params => params.companyName,
  paramsSelector,
);

export default compose(
  withRouter,
  withProps(({ match, location }) => {
    const page = validatePage(pageSelector({ location }));
    const companyName = companyNameSelector({ match });

    return {
      companyName,
      page,
    };
  }),
);
