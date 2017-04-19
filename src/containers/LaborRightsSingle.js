import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsSingle from '../components/LaborRightsSingle';
import {
  getSingleLaborRightsById,
  getSingleLaborRightsPrevAndNext,
} from '../selectors/laborRights';

export default connect(
  (state, { params: { id } }) => ({
    item: getSingleLaborRightsById(state, { id }),
    ...getSingleLaborRightsPrevAndNext(state, { id }),
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
