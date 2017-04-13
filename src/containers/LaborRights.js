import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRights from '../components/LaborRights';

export default connect(
  (state, { params: { id }}) => ({
      id,
      item: state.laborRights.get(id).toJS(),
  }),
  dispatch => ({
    download: () => {
      dispatch(loadLaborRights());
    },
  })
)(LaborRights);
