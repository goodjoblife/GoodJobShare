import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';
import {
  getLaborRightsMenuProps,
} from '../selectors/laborRights';

export default connect(
  getLaborRightsMenuProps,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
