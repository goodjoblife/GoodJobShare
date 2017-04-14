import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(
  (state, { params: { id } }) => {
    const item = state.laborRights.get(id);
    const { title = '', content = '' } = (item && item.toJS()) || {};
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
