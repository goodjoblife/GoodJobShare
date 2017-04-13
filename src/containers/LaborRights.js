import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(mapStateToProps)(LaborRights);

export default connect(
  (state, { params: { id }}) => {
    const items = state.laborRights.toJS().filter(({ id:_id }) => id==_id);
    const item = items.length == 1? items[0]: null;
    return {
      id,
      item,
    }
  },
  dispatch => ({
    download: () => {
      dispatch(loadLaborRights());
    },
  })
)(LaborRights);
