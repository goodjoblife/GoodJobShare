import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from '../actions/laborRights';
import { fetchMyPermission } from '../actions/me';
import {
  menuEntriesSelector,
  entryDataSelector,
  entryStatusSelector,
} from '../selectors/laborRightsSelector';
import LaborRightsSingle from '../components/LaborRightsSingle';

import { canViewLaborRightsSingleSelector } from '../selectors/meSelector';

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  const menuEntries = menuEntriesSelector(state); // List
  const index = menuEntries.findIndex(menuEntry => menuEntry.get('id') === id);
  const prevEntry = menuEntries.get(index > 0 ? index - 1 : undefined);
  const nextEntry = menuEntries.get(
    index < menuEntries.size - 1 ? index + 1 : undefined
  );
  return {
    entry: entryDataSelector(id)(state),
    entryStatus: entryStatusSelector(id)(state),
    entryError: state.laborRights.getIn(['entries', id, 'error']),
    prevEntry,
    nextEntry,
    canViewLaborRightsSingle: canViewLaborRightsSingleSelector(state),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryMenuIfUnfetched,
      queryEntryIfUnfetched,
      fetchMyPermission,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaborRightsSingle);
