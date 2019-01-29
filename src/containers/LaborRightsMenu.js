import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { queryMenuIfUnfetched } from '../actions/laborRights';
import {
  menuEntriesSelector,
  menuStatusSelector,
} from '../selectors/laborRightsSelector';
import LaborRightsMenu from '../components/LaborRightsMenu';

const mapStateToProps = state => ({
  menuEntries: menuEntriesSelector(state),
  menuStatus: menuStatusSelector(state),
  menuError: state.laborRights.get('menuError'),
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
)(LaborRightsMenu);
