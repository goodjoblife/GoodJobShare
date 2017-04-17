import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    items: state.laborRights.get('dataMapById').valueSeq(),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
