import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRightsMenu';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    metaList: state.laborRightsMenu.get('metaList', List()),
    isFetching: state.laborRightsMenu.get('metaListIsFetching'),
    error: state.laborRightsMenu.get('metaListError'),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
