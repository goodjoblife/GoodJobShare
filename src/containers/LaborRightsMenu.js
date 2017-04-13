import { connect } from 'react-redux';
import { loadLaborRights } from '../actions/laborRights';
import LaborRightsMenu from '../components/LaborRightsMenu';

export default connect(
  state => ({
    items: state.laborRights.valueSeq().toJS(),
  }),
  dispatch => ({
    download: () => {
      dispatch(loadLaborRights());
    },
  })
)(LaborRightsMenu);
