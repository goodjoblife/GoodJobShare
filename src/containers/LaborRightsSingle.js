import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsSingle from '../components/LaborRightsSingle';
import {
  makeSingleLaborRightsProps,
} from '../selectors/laborRights';

export default connect(
  makeSingleLaborRightsProps(),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
