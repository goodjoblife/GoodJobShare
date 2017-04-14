import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(
  (state, { params: { id } }) => {
    const title = state.laborRights.getIn([id, 'title'], '');
    const content = state.laborRights.getIn([id, 'content'], '');
    const ids = state.laborRights.keySeq();
    const index = ids.indexOf(id);
    const prev = index > 0 ? ids.get(index - 1) : undefined;
    const next = index < ids.count() - 1 ? ids.get(index + 1) : undefined;
    return {
      title,
      content,
      prev,
      next,
    };
  },
  dispatch => ({
    download: () => {
      dispatch(loadLaborRights());
    },
  })
)(LaborRights);
