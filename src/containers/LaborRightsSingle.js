import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';
import {
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from '../actions/laborRights';
import {
  menuEntriesSelector,
  entryDataSelector,
  entryStatusSelector,
  entryErrorSelector,
} from '../selectors/laborRightsSelector';
import LaborRightsSingle from '../components/LaborRightsSingle';

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  const menuEntries = menuEntriesSelector(state);
  const index = R.findIndex(R.propEq('id', id))(menuEntries);
  const prevEntry = index > 0 ? menuEntries[index - 1] : undefined;
  const nextEntry =
    index < menuEntries.length - 1 ? menuEntries[index + 1] : undefined;

  return {
    entry: entryDataSelector(id)(state),
    entryStatus: entryStatusSelector(id)(state),
    entryError: entryErrorSelector(id)(state),
    prevEntry,
    nextEntry,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryMenuIfUnfetched,
      queryEntryIfUnfetched,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaborRightsSingle);
