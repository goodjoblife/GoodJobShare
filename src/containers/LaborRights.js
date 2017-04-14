import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(
  (state, { params: { id } }) => {
    const item = state.laborRights.get(id).toJS();
    const { title, content } = item;
    return {
      id,
      title,
      content,
    };
  },
  dispatch => ({
    download: () => {
      dispatch(loadLaborRights());
    },
  })
)(LaborRights);
