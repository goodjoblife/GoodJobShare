import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/LaborRightsMenu';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    metaList: state.LaborRightsMenu.get('metaList'),
    status: state.LaborRightsMenu.get('metaListStatus'),
    error: state.LaborRightsMenu.get('metaListError'),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
