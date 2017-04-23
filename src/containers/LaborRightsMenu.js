import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';
import { laborRightsMenuProps } from '../selectors/laborRights';

export default connect(
  laborRightsMenuProps,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
