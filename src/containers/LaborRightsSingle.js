import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsSingle from '../components/LaborRightsSingle';
import { singleLaborRightsProps } from '../selectors/laborRights';

export default connect(
  singleLaborRightsProps,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
