import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsSingle from '../components/LaborRightsSingle';
import { getSingleLaborRightsProps } from '../selectors/laborRights';

export default connect(
  getSingleLaborRightsProps,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
