import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import { queryMenuIfUnfetched } from '../../actions/laborRights';
import { queryPopularExperiences } from '../../actions/popularExperiences';
import {
  menuEntriesSelector,
} from '../../selectors/laborRightsSelector';

const mapStateToProps = state => ({
  popularExperiences: state.popularExperiences.get('data'),
  laborRightsMenuEntries: menuEntriesSelector(state).slice(-3),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    queryMenuIfUnfetched,
    queryPopularExperiences,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
