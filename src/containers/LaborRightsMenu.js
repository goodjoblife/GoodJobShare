import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/LaborRightsSingle';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    metaList: state.LaborRightsSingle.get('metaList'),
    status: state.LaborRightsSingle.get('status'),
    error: state.LaborRightsSingle.get('error'),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
