import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';
import {
  makeLaborRightsMenuProps,
} from '../selectors/laborRights';

export default connect(
  makeLaborRightsMenuProps(),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsMenu);
