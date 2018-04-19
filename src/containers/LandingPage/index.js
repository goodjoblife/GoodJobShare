import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';

import LandingPage from '../../components/LandingPage';
import { queryMenuIfUnfetched } from '../../actions/laborRights';
import { queryPopularExperiences } from '../../actions/popularExperiences';
import { queryTimeAndSalaryCountIfUnfetched } from '../../actions/timeAndSalary';
import {
  menuEntriesSelector,
} from '../../selectors/laborRightsSelector';

const laborRightsCountSelector = R.compose(
  entries => entries.size,
  menuEntriesSelector,
);

const mapStateToProps = state => ({
  popularExperiences: state.popularExperiences.get('data'),
  laborRightsMenuEntries: menuEntriesSelector(state).slice(-3),
  laborRightsCount: laborRightsCountSelector(state),
  timeAndSalaryCount: state.timeAndSalary.get('count'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryMenuIfUnfetched,
    queryPopularExperiences,
    queryTimeAndSalaryCount: queryTimeAndSalaryCountIfUnfetched,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
