import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import { queryMenuIfUnfetched } from '../../actions/laborRights';
import { menuEntriesSelector } from '../../selectors/laborRightsSelector';

const mapStateToProps = state => ({
  laborRightsMenuEntries: menuEntriesSelector(state).slice(-3),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryMenuIfUnfetched,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
