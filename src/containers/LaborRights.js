import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(
  (state, { params: { id } }) => {
    const title = state.laborRights.getIn([id, 'title'], '');
    const content = state.laborRights.getIn([id, 'content'], '');
    const ids = state.laborRights.keySeq();
    const index = ids.indexOf(id);
    const prevId = index > 0 ? ids.get(index - 1) : undefined;
    const nextId = index < ids.count() - 1 ? ids.get(index + 1) : undefined;
    const prev = state.laborRights.get(prevId);
    const next = state.laborRights.get(nextId);
    return {
      title,
      content,
      prev,
      next,
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRights);
